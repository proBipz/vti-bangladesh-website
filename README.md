# Vision Trade International website

Static, multi-page website for Vision Trade International (Bangladesh).

## Pages

- Home
- Company
- Solutions
- Principals
- Services
- Clients
- Contact

## Local preview

Open `dist/index.html` directly, or serve the `dist` directory with any static web server.

```sh
python3 -m http.server 4173 --directory dist
```

## Render deployment

The included `render.yaml` defines a Render Static Site with `dist` as the publish directory. Connect the GitHub repository in Render or apply the Blueprint from the repository root.

## GitHub versioning

The repository keeps the initial redesign and subsequent visual-storytelling update as separate commits. Future website versions should be committed and tagged before deployment.

## Contact form

The static form validates input and opens a pre-addressed email in the visitor's default mail application. Connect it to a server endpoint later if direct browser submission is required.

## Content sources

Company history and contact details were retained from the existing VTI website. Principal descriptions and categories were researched from each manufacturer's official website. Principal/product logo and image files included in this project were downloaded from the corresponding official manufacturer website for this VTI prototype; confirm final publication permissions with each principal before production use.
