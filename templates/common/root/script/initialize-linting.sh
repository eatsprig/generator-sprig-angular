#!/bin/bash

# This script sets up a local Git pre-commit hook that performs Javascript linting.

echo "Initializing Javascript linting pre-commit hook..."
cat > .git/hooks/pre-commit << EOF
#!/bin/bash

./script/git-hooks/pre-commit.sh
EOF
chmod a+x .git/hooks/pre-commit
echo "Linting successfully initialized."
