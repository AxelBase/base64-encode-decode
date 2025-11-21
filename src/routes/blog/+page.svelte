<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      slug: 'post1',
      title: 'What is Base64? The Complete Technical Breakdown',
      description: 'Deep dive into the Base64 encoding algorithm, why it uses 64 characters, padding rules, and how it differs from binary-to-text alternatives.'
    },
    {
      slug: 'post2',
      title: 'Base64 vs Base64url: When to Use Which',
      description: 'Technical comparison of standard Base64 vs URL-safe variant, character substitutions, real-world use cases in JWTs, APIs, and file names.'
    },
    {
      slug: 'post3',
      title: 'How Base64 Padding Works (and Why It’s Required)',
      description: 'Explains the = and == padding mechanism, quantum physics of 3-byte blocks, and why some implementations incorrectly strip padding.'
    },
    {
      slug: 'post4',
      title: 'Performance: Encoding vs Decoding Speed in Modern Browsers',
      description: 'Benchmark results of native btoa/atob vs modern Uint8Array methods vs Web Workers. Real numbers from Chrome, Firefox, and Safari.'
    },
    {
      slug: 'post5',
      title: 'Streaming Large Files to Base64 Without OOM Errors',
      description: 'How to safely encode/decode multi-gigabyte files using FileReader streams, Blob slicing, and chunked processing.'
    },
    {
      slug: 'post6',
      title: 'Common Base64 Corruption Patterns & How to Detect Them',
      description: 'Line breaks, missing padding, wrong alphabet, whitespace injection — learn to identify and fix the 7 most common Base64 errors.'
    },
    {
      slug: 'post7',
      title: 'Building Offline-First Tools with Base64 (Like AxelBase)',
      description: 'Architectural decisions behind fully client-side Base64 tools: no backend, zero data transmission, instant load, and PWA capabilities.'
    }
  ];
</script>

<svelte:head>
  <title>Blog • AxelBase – Base64 Insights</title>
  <meta name="description" content="Technical deep dives, performance tips, and best practices for Base64 encoding and decoding in modern web applications." />
</svelte:head>

<div class="container py-5 blog-index">
  <header class="text-center mb-5 pb-4 border-bottom">
    <h1 class="display-5 fw-bold text-primary mb-3">
      Blog: AxelBase Technical Notes
    </h1>
    <p class="lead text-muted col-lg-8 mx-auto">
      In-depth articles about Base64 encoding, performance, edge cases, browser quirks, and building fast, private, offline-first web tools.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}/blog/posts/{post.slug}" class="card post-card h-100 text-decoration-none shadow-sm border-0">
        <div class="card-body d-flex flex-column">
          <h2 class="h5 fw-bold text-dark mb-3">{post.title}</h2>
          <p class="text-muted small flex-grow-1 mb-4">{post.description}</p>
          <span class="text-primary fw-semibold mt-auto">
            Read article →
          </span>
        </div>
      </a>
    {/each}
  </div>

  <div class="text-center mt-5 pt-4">
    <p class="text-muted small">
      All articles are 100% client-side • No tracking • Works offline
    </p>
  </div>
</div>

<style>
  .blog-index {
    max-width: 1200px;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .post-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    background: var(--bs-light);
    border-radius: 12px;
    overflow: hidden;
  }

  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
    text-decoration: none;
  }

  .post-card .card-body {
    padding: 1.75rem;
  }

  .post-card h2 {
    line-height: 1.4;
    color: #0d6efd;
  }

  .post-card:hover span {
    transform: translateX(6px);
    display: inline-block;
  }
</style>