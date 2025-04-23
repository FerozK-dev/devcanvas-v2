from agno.models.google import Gemini
from agno.agent import Agent
from textwrap import dedent
import json
from datetime import datetime
from app.schemas import ResumeGenerateResult
from app.models import UserPublic
from typing import Union

# model = Ollama(id="qwen2.5:7b", host=settings.OLLAMA_HOST)
model = Gemini(id="gemini-2.0-flash")

resume_agent: Agent = Agent(
    name="resume_asisstant_agent",
    model=model,
    description="You are a helpful Agent called 'Resume Helper' and your goal is to assist the user in crafting the perfect resume based on theri background and the position they are applying for",
    instructions=[
        "1. Input format",
        "   - The input ALWAYS contains a person's background. This includes their education, experience and projects",
        "   - The input MAY include the job description of the position the user is applying. If it is not provided, it will be show as None or empty",
        "2. Resume creation",
        "   - ONLY uses information provided by the user. Do not add extra skills or achievements that the user does not have",
        "   - In the Experience section, the user may write their responsibilities in a non optimal way, rewrite them so that they follow best practices and optimize for ATS system. Do not mention exact time just the months and years"
        "   - IF a job description is PROVIDED, highlight the user skills that matches the position's requirement. DO NOT make up the user's skill to match",
        "   - Create a summary section to summarize the user background, skillset and aspire in about 3 sentences"
        "3. Memory usage:",
        "   - DO NOT use previous context and information from older conversation",
        "   - ONLY use information provided by the latest prompt. User Interaction:",
        "   - DO NOT ask anything from the user. Just return the generated result",
        "5. Response format:",
        "   - Return the created resume in a JSON format. Return a raw json, DO NOT use MARKDOWN syntax",
        "   - The return should be in the following format:",
        dedent(
            """\
                {
                    "personal_info": {
                        "name": "name",
                        "email": "email",
                        "phone": "phone",
                        "location": "country"
                    },
                    "education": [
                        {
                        "degree": "",
                        "school": "",
                        "year": "",
                        "field": "",
                        "grade": ""
                        }
                    ],
                    "experience": [
                        {
                        "title": "",
                        "company": "",
                        "duration": "",
                        "location": "",
                        "description": "",
                        "responsibilities": ["", ""]
                        }
                    ],
                    "projects": [
                        {
                        "title": "",
                        "description": "",
                        "technologies": ["", ""]
                        }
                    ],
                    "skills": ["",""],
                    "summary": ""
                }
                """
        ),
    ],
    markdown=False,  # This setting tells the model to format messages in markdown
    show_tool_calls=False,
    add_history_to_messages=False,  # Adds chat history to messages
    add_datetime_to_instructions=False,
    debug_mode=False,
    read_tool_call_history=False,
    num_history_responses=0,
    response_model=ResumeGenerateResult,
)


def format_date(date_val: Union[datetime, str, None]) -> str:
    """
    Extract just month and year from a datetime object or ISO date string.
    Returns an empty string for None or invalid formats.
    """
    if date_val is None:
        return ""

    if isinstance(date_val, datetime):
        return date_val.strftime("%b %Y")  # e.g., "Jan 2021"

    if isinstance(date_val, str):
        try:
            parsed_date = datetime.fromisoformat(date_val)
            return parsed_date.strftime("%b %Y")
        except ValueError:
            return ""

    return ""


def clean_user_for_ai(user: UserPublic) -> dict:
    """Convert all datetime fields to strings before serialization"""
    user_dict = user.model_dump(mode="json")  # Use mode="json" to handle basic serialization

    # Process experiences
    for exp in user_dict.get("experiences", []):
        exp["startDate"] = format_date(exp.get("startDate"))
        exp["endDate"] = format_date(exp.get("endDate"))

    # Process educations
    for edu in user_dict.get("educations", []):
        edu["startYear"] = format_date(edu.get("startYear"))
        edu["endYear"] = format_date(edu.get("endYear"))
        edu["field"] = str(edu.get("field", ""))
        edu["grade"] = str(edu.get("grade", ""))

    return user_dict


def generate_resume(
    user: UserPublic, job_description: str | None = None
) -> ResumeGenerateResult:
    clean_user = clean_user_for_ai(user)

    """ """
    data_send_to_ai = f"""
        Education:
        - {json.dumps(clean_user.get("educations", []), indent=2)}
        Projects:
        - {json.dumps(clean_user.get("projects", []), indent=2)}
        Experience:
        - {json.dumps(clean_user.get("experiences", []), indent=2)}

    """
    question = (
        f"Create a resume for the user with the following background {data_send_to_ai}."
    )

    if job_description is not None:
        question += f"Tailor the resume to highlight the user's skill to match this job description: {job_description}"

    response = resume_agent.run(question)

    return response.content
