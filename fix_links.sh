#!/bin/bash

# This script fixes all nested Link/anchor tags in components

# Function to replace nested anchor tags
fix_links() {
    local file=$1
    # Safely save the original file
    cp "$file" "$file.bak"
    
    # Use perl for multiline regex replacement
    perl -0777 -i -pe '
        s/<Link href="([^"]+)">\s*<a([^>]+)>(.*?)<\/a>\s*<\/Link>/<Link href="\1"\2>\3<\/Link>/gs
    ' "$file"
    
    echo "Links fixed in $file"
}

# Fix links in navbar component
fix_links "client/src/components/layout/navbar.tsx"

# Fix links in quick-links component
fix_links "client/src/components/home/quick-links.tsx"

# Fix links in footer component (if it exists)
if [ -f "client/src/components/layout/footer.tsx" ]; then
    fix_links "client/src/components/layout/footer.tsx"
fi