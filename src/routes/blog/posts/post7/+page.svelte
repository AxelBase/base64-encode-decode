<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Building Offline-First Base64 Tools • AxelBase Philosophy</title>
  <meta name="description" content="Why AxelBase works 100% offline, sends zero data, and how you can build privacy-first web tools." />
  <meta property="og:title" content="Building Offline-First Tools • AxelBase" />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Offline-First Philosophy</p>
  </div>

  <article class="prose">
    <h1>Building Truly Offline-First Web Tools (The AxelBase Way)</h1>
    <p class="post-meta">Published: November 21, 2025</p>

    <p>AxelBase proves that powerful tools don’t need servers, tracking, or accounts. 100% client-side. Zero data sent. Works offline forever.</p>

    <h2>Core Principles</h2>
    <ul>
      <li>No backend</li>
      <li>No analytics</li>
      <li>No cookies</li>
      <li>No permissions</li>
      <li>Works on file:// and GitHub Pages</li>
    </ul>

    <p class="italic-note">Privacy isn’t a feature — it’s the default.</p>
  </article>
</div>

<style>
  /* Same shared styles as before */
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; color: #0d6efd; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid #eee; padding-bottom: .5rem; color: #0d6efd; }
  .prose .post-meta { color: #666; font-size: .9rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
  .prose ul { padding-left: 1.5rem; }
  .italic-note { font-style: italic; text-align: center; color: #666; margin-top: 3rem; }
</style>