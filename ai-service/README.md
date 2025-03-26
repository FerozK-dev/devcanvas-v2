
This project is created and managed with `uv`. For details on uv checkout: [uv official site](https://docs.astral.sh/uv/guides/projects/#managing-dependencies)

# To run locally

First, you need to install uv. On Linux:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

On Windows:
```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```


Then simply run 

```bash
uv run -- fastapi dev app/main.py
```