from agno.models.ollama import Ollama
from agno.agent import Agent
from textwrap import dedent

from app.settings import settings
from app.schemas import ResumeResponse, ResumeInput


model = Ollama(id="qwen2.5:7b", host=settings.OLLAMA_HOST)

resume_agent: Agent = Agent(
        name="resume_asisstant_agent",
        model=model,
        description="You are a helpful Agent called 'Resume Helper' and your goal is to assist the user in crafting the perfect resume based on theri background and the position they are applying for",
        instructions=[
            "1. Input format",
            "   - The input ALWAYS contains a person's background. This includes their general information, education, experience and projects",
            "   - The input MAY include the job description of the position the user is applying. If it is not provided, it will be show as None or empty",
            "2. Resume creation",
            "   - ONLY uses information provided by the user. Do not add extra skills or achievements that the user does not have",
            "   - IF a job description is PROVIDED, highlight the user skills that matches the position's requirement. DO NOT make up the user's skill to match",
            "3. Memory usage:",
            "   - DO NOT use previous context and information from older conversation",
            "   - ONLY use information provided by the latest prompt"
            "4. User Interaction:",
            "   - DO NOT ask anything from the user. Just return the result",
            "5. Response format:",
            "   - Return the created resume in a JSON format",
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
                        "year": ""
                        }
                    ],
                    "experience": [
                        {
                        "title": "",
                        "company": "",
                        "duration": "",
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
                    "skills": ["",""]
                }
                """
            ),
        ],
        markdown=False,  # This setting tellss the model to format messages in markdown
        show_tool_calls=False,
        add_history_to_messages=False,  # Adds chat history to messages
        add_datetime_to_instructions=False,
        debug_mode=False,
        read_tool_call_history=False,
        num_history_responses=0,
    )

def generate_resume(resume_input: ResumeInput) -> str:
    """
    """

    question = f"Create a resume for the user with the following background {resume_input.model_dump_json(exclude=["job_description"])}."

    if resume_input.job_description is not None:
        question += f"Tailor the resume to highlight the user's skill to match this job description: {resume_input.job_description}"

    response = resume_agent.run(question)

    result = ResumeInput.model_validate_json(response.content)

    print(result)
