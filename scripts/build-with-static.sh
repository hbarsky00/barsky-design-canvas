
#!/bin/bash

# Build the React app
npm run build

# Generate static pages
node scripts/generate-static-pages.js

echo "Build completed with static pages generated!"
