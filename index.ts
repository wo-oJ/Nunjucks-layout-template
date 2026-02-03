import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import nunjucks from 'nunjucks'

const app = new Hono()

const layoutTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Hono App{% endblock %}</title>
    <script src="https://cdn.tailwindcss.com"></script> {# 디자인을 위해 Tailwind 추가 #}
</head>
<body class="bg-gray-100">
    <nav class="p-4 bg-white shadow-md">
        <div class="container mx-auto">
            <a href="/" class="font-bold text-xl">Hono Single File</a>
        </div>
    </nav>
    <main class="container mx-auto p-8">
        {% block content %}{% endblock %}
    </main>
</body>
</html>
`;

const indexTemplate = `
{% extends "layout.njk" %}
{% block title %}메인 페이지{% endblock %}
{% block content %}
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">{{ message }}</h1>
        <ul class="list-disc ml-5">
            {% for item in items %}
                <li class="text-blue-600">{{ item }}</li>
            {% endfor %}
        </ul>
    </div>
{% endblock %}
`;


class SimpleLoader extends nunjucks.Loader {
  templates: Record<string, string>;
  constructor(templates: Record<string, string>) {
    super();
    this.templates = templates;
  }
  getSource(name: string) {
    if (this.templates[name]) {
      return {
        src: this.templates[name],
        path: name,
        noCache: true
      };
    }
    return null;
  }
}

const loader = new SimpleLoader({
  "layout.njk": layoutTemplate,
  "index.njk": indexTemplate
});
const env = new nunjucks.Environment(loader);


app.get('/', (c) => {
  const html = env.render('index.njk', {
    message: '파일 하나로 실행되는 Hono & Nunjucks!',
    items: ['TypeScript', 'Hono', 'Nunjucks', 'Node.js']
  });
  return c.html(html);
});


const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});