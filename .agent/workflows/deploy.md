---
description: Auto-deploy to Vercel after any code changes
---

# Auto-Deploy to Vercel

After making any code changes to the tribu project, always run:

// turbo-all

1. Stage, commit, and push all changes:
```bash
cd /Users/raphael/Downloads/tribu && git add . && git commit -m "<descriptive commit message>" && git push
```

Vercel will automatically pick up the push to `main` and deploy to production.
