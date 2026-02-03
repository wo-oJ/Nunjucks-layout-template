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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
    /* small card shadow for subtle depth */
    .card { box-shadow: 0 6px 18px rgba(16,24,40,0.06); }
  </style>
</head>
<body class="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen text-gray-800">
  <header class="bg-white/70 backdrop-blur sticky top-0 z-20">
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">HJ</div>
        <div>
          <div class="font-semibold text-lg">Hono Single File</div>
          <div class="text-xs text-gray-500">Nunjucks · Tailwind · TypeScript</div>
        </div>
      </a>

      <div class="hidden md:flex items-center gap-6">
        <a href="#features" class="text-sm text-gray-600 hover:text-indigo-600">Features</a>
        <a href="#about" class="text-sm text-gray-600 hover:text-indigo-600">About</a>
        <a href="https://github.com/wo-oJ/nunjucks-layout-template" target="_blank" class="text-sm text-gray-600 hover:text-indigo-600">Repository</a>
      </div>

      <div class="flex items-center gap-3">
        <a href="#" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-md shadow-sm hover:bg-indigo-700">Get started</a>
      </div>
    </nav>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-12">
    {% block content %}{% endblock %}
  </main>

  <footer class="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">
    <div class="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>© {{ year }} Hono Single File · Built with ❤️</div>
      <div class="flex items-center gap-4">
        <a href="https://github.com/wo-oJ" target="_blank" class="hover:text-indigo-600">@wo-oJ</a>
        <a href="https://github.com/wo-oJ/nunjucks-layout-template" target="_blank" class="hover:text-indigo-600">Repo</a>
      </div>
    </div>
  </footer>
</body>
</html>
`;

const indexTemplate = `
{% extends "layout.njk" %}
{% block title %}메인 페이지{% endblock %}
{% block content %}
  <section class="grid gap-8 md:grid-cols-3 md:items-start">
    <div class="md:col-span-2">
      <div class="card bg-white p-8 rounded-lg">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ message }}</h1>
        <p class="text-gray-600 mb-6">간단한 단일 파일 Hono + Nunjucks 템플릿으로 깔끔한 UI를 제공합니다. Tailwind로 빠르게 스타일링되어 있으며 반응형 레이아웃을 지원합니다.</p>

        <div class="grid gap-3 grid-cols-2 sm:grid-cols-4">
          {% for item in items %}
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
              <div class="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">{{ item[0] }}</div>
              <div class="text-sm font-medium">{{ item }}</div>
            </div>
          {% endfor %}
        </div>

        <div class="mt-6 flex items-center gap-3">
          <a class="inline-flex items-center px-5 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700" href="#">시작하기</a>
          <a class="inline-flex items-center px-5 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50" href="#">문서 보기</a>
        </div>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div class="card bg-white p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900">빠른 설정</h3>
          <p class="text-gray-600 text-sm mt-2">한 파일로 구성되어 있어 예제를 확인하고 바로 수정해볼 수 있습니다.</p>
        </div>
        <div class="card bg-white p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900">반응형 디자인</h3>
          <p class="text-gray-600 text-sm mt-2">Tailwind 기반으로 다양한 화면 크기에서 깔끔하게 동작합니다.</p>
        </div>
      </div>
    </div>

    <aside class="space-y-4">
      <div class="card bg-white p-6 rounded-lg">
        <h4 class="font-semibold">Quick Links</h4>
        <ul class="mt-3 text-sm space-y-2">
          <li><a href="#" class="text-indigo-600 hover:underline">Getting started</a></li>
          <li><a href="#" class="text-indigo-600 hover:underline">Examples</a></li>
          <li><a href="#" class="text-indigo-600 hover:underline">API</a></li>
        </ul>
      </div>

      <div class="card bg-white p-6 rounded-lg">
        <h4 class="font-semibold">About</h4>
        <p class="text-gray-600 text-sm mt-2">이 템플릿은 Hono와 Nunjucks를 사용해 빠르게 프로토타입을 만들 수 있게 도와줍니다.</p>
      </div>
    </aside>
  </section>
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
    items: ['TypeScript', 'Hono', 'Nunjucks', 'Node.js'],
    year: new Date().getFullYear()
  });
  return c.html(html);
});


const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
