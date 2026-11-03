---
name: webflow-skills-knowledge-base
description: >
  ALWAYS LOAD THIS SKILL alongside any Webflow-related task. Comprehensive knowledge base compiling
  all 22 Webflow agent skills across three plugin families: MCP-based site management, CLI tools,
  and Code Components. Covers CMS, publishing, audits, accessibility, link checking, FlowKit naming,
  Webflow Cloud deploy, DevLink, Designer Extensions, code component scaffold/convert/audit/deploy,
  and troubleshooting. Trigger on ANY mention of Webflow, CMS, collections, publish, deploy,
  code components, DevLink, Designer Extension, FlowKit, accessibility audit, asset audit,
  link checker, safe publish, site audit, bulk CMS, custom code, or webflow CLI.
version: 1.0.0
---

# Webflow Skills Master Reference
> All 22 Webflow skills consolidated into one file.
> Source: webflow/webflow-skills plugin for Claude Code
> Generated: 2026-04-07

---


<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 1/22: code-component-command -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-cli:code-component
description: Create and deploy reusable React components for Webflow Designer. Configure existing React projects with webflow.json, build and bundle code, validate output, and deploy to workspace using library share. Use when building custom components for designers.
---

# Code Component

Create, build, and deploy React components to Webflow Designer with comprehensive validation and deployment verification.

## Important Note

**ALWAYS use Bash tool for all Webflow CLI operations:**
- Execute `webflow` CLI commands via Bash tool
- Use Read tool to examine generated files (never modify)
- Use Glob tool to discover project files
- Verify CLI installation: `webflow --version`
- Check authentication: On first `webflow library share`, workspace authentication happens automatically
- DO NOT use Webflow MCP tools for CLI workflows
- All CLI commands require proper descriptions (not context parameters)

**Package Manager Detection:**
- Check for lock files: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn)
- If no lock file found, ask user which package manager to use (npm/pnpm/yarn)
- Use detected package manager for all install/build commands

## Instructions

### Phase 1: Environment Verification
1. **Verify CLI installed**: Run `webflow --version` to confirm CLI is installed
2. **Check project state**: Determine if user has existing React project or needs guidance
3. **Identify workspace**: Explain that workspace authentication happens on first share
4. **Review configuration**: Check if webflow.json exists with library configuration

### Phase 2: Project Configuration
5. **Ask operation type**: Clarify what user wants to do:
   - Configure existing React project for Code Components
   - Add components to already-configured project
   - Build and share existing library
6. **Configure webflow.json**: Add library configuration to webflow.json:
   - Library name (appears in Webflow Designer)
   - Components glob pattern (e.g., `./src/**/*.webflow.tsx`)
   - Optional bundleConfig for custom webpack
7. **Read configuration files**: Use Read tool to show:
   - `webflow.json` - Library configuration
   - `package.json` - Dependencies and scripts
   - Component file structure
8. **Verify dependencies**: Ensure React is installed and build scripts exist

### Phase 3: Build & Bundle Validation
9. **Run build**: Execute user's build command (e.g., `npm run build`, `yarn build`)
10. **Validate build output**: Check for build errors or warnings
11. **Run bundle command**: Execute `webflow library bundle` for local validation
12. **Analyze bundle**:
    - Bundle size (should be < 2MB)
    - Dependencies included
    - Output location (default: `./dist`)
    - Validation warnings
13. **Preview bundle details**: Show bundle summary with validation status

### Phase 4: Preview & Approval
14. **Show deployment preview**:
    - Library name from webflow.json
    - Component files included
    - Bundle size and validation status
    - Target workspace (will be selected on first share)
    - Explain workspace authentication if first time
15. **Explain deployment**: What happens when library is shared
16. **Require explicit confirmation**: User must type "share" or "deploy" to proceed
17. **Confirm workspace**: Explain browser will open for workspace selection (first time only)

### Phase 5: Deployment & Verification
18. **Execute share command**: Run `webflow library share`
19. **Monitor deployment**: Show CLI output and progress
20. **Handle workspace auth**: If first time, guide user through browser authentication
21. **Verify deployment success**: Confirm library appears in workspace
22. **Show .env updates**: Explain WEBFLOW_WORKSPACE_ID and WEBFLOW_WORKSPACE_API_TOKEN added
23. **Provide next steps**:
    - How to use components in Designer
    - How to update components
    - Testing recommendations
    - Using `webflow library log` for debugging

## Examples

### Example 1: Configure Existing React Project

**User prompt:**
```
I have a React project with some components I want to share to Webflow
```

**Step 1: Environment Verification**
```
🔍 Webflow CLI Environment Check

Checking CLI installation...
✓ Webflow CLI installed: v1.5.2

Current directory: /Users/user/projects/my-components
✓ Found package.json with React project
✓ Found src/ directory with components

Checking webflow.json...
⚠️ No webflow.json found - needs configuration

Ready to configure for Code Components? (yes/no)
```

*User confirms: yes*

**Step 2: Project Configuration**
```
📋 Configure Code Components Library

I'll help you add the library configuration to webflow.json.

Questions:
1. What should your library be called in Webflow Designer?
   Example: "My Component Library"

2. Where are your component files located?
   Pattern examples:
   - "./src/**/*.webflow.tsx" (components with .webflow.tsx extension)
   - "./src/components/**/*.tsx" (all components in src/components/)
   - "./src/Button.tsx" (specific files)

Let me know the library name and component pattern.
```

*User provides: "Acme Components" and "./src/**/*.webflow.tsx"*

```
Creating webflow.json configuration...

{
  "library": {
    "name": "Acme Components",
    "components": ["./src/**/*.webflow.tsx"]
  }
}

✓ Configuration ready

Found component files:
- src/Button.webflow.tsx
- src/Card.webflow.tsx
- src/Hero.webflow.tsx

Next: Build your components and run bundle command.
```

**Step 3: Build & Bundle Validation**
```
🔨 Building Components

What build command do you use? (e.g., npm run build, yarn build)
```

*User responds: npm run build*

```
Executing: npm run build

Output:
✓ TypeScript compilation successful
✓ Components built to dist/

Creating bundle for validation...
Executing: webflow library bundle

Output:
✓ Analyzing 3 components
✓ Bundling dependencies
✓ Creating bundle
✓ Bundle created: dist/bundle.js

📦 Bundle Analysis:
- Size: 287 KB (✓ within 2MB limit)
- Components: 3 (Button, Card, Hero)
- Dependencies: react@18.2.0, react-dom@18.2.0
- Output: ./dist
- Validation: ✅ All checks passed
```

**Step 4: Preview & Approval**
```
📋 Deployment Preview

Library: Acme Components
Components: 3 (Button, Card, Hero)
Bundle Size: 287 KB

Workspace Authentication:
⚠️ This appears to be your first deployment. When you run 'share':
1. Browser will open for workspace authentication
2. Select your target Webflow workspace
3. Grant access to deploy components
4. CLI will create .env with credentials:
   - WEBFLOW_WORKSPACE_ID
   - WEBFLOW_WORKSPACE_API_TOKEN

Validation Status: ✅ Ready to deploy
- Bundle size: ✓ 287 KB (< 2MB limit)
- Dependencies: ✓ Valid (React 18.2.0)
- Configuration: ✓ webflow.json valid
- Components: ✓ 3 components found

⚠️ Type "share" to deploy this library to your workspace.
```

*User confirms: share*

**Step 5: Deployment & Verification**
```
🚀 Deploying Library

Executing: webflow library share

Output:
✓ Bundling library (287 KB)
✓ Opening browser for workspace authentication...

[Browser opens - user authenticates and selects workspace]

✓ Workspace authenticated: Acme Corp
✓ Uploading bundle
✓ Validating components
✓ Registering with workspace
✓ Library deployed successfully

✅ Library Deployed: Acme Components

Workspace: Acme Corp
Components: 3 (Button, Card, Hero)
Version: Latest
Status: Active

📁 Environment Updated:
Created .env file with:
- WEBFLOW_WORKSPACE_ID=workspace_abc123
- WEBFLOW_WORKSPACE_API_TOKEN=************

⚠️ Important: Add .env to your .gitignore file!

📋 Next Steps:
1. Open Webflow Designer
2. Go to Add Elements → Code Components
3. Find "Acme Components" in the list
4. Drag components onto canvas to use

💡 To update components:
1. Make changes to your component files
2. Run: npm run build
3. Run: webflow library share
   (No re-authentication needed - uses .env credentials)

🔍 For debugging:
- View logs: webflow library log
- Bundle locally: webflow library bundle
- Check bundle size: webflow library bundle --verbose

Component Library URL: https://webflow.com/dashboard/workspaces/acme-corp/components
```

### Example 2: Update Existing Library

**User prompt:**
```
Update my Code Components library with new changes
```

**Step 1: Environment Verification**
```
🔍 Code Components Library Check

Checking configuration...
✓ webflow.json found with library config
✓ Library name: Acme Components
✓ Components pattern: ./src/**/*.webflow.tsx

Checking authentication...
✓ Found .env with workspace credentials
✓ Workspace: Acme Corp

Found components:
- src/Button.webflow.tsx (modified)
- src/Card.webflow.tsx
- src/Hero.webflow.tsx
- src/Form.webflow.tsx (new)

Ready to build and share updates? (yes/no)
```

**Step 2-3: Build & Bundle**
```
🔨 Building Components

Executing: npm run build
✓ Build complete

Bundling for validation...
Executing: webflow library bundle

📦 Bundle Analysis:
- Size: 312 KB (✓ within 2MB limit)
- Components: 4 (Button, Card, Hero, Form) [+1 new]
- Changes: Button updated, Form added
- Validation: ✅ All checks passed
```

**Step 4: Preview**
```
📋 Update Preview

Library: Acme Components
Workspace: Acme Corp (already authenticated)

Changes:
✓ Button component (updated)
✓ Form component (new)
  Card component (unchanged)
  Hero component (unchanged)

Bundle Size: 312 KB (+25 KB from 287 KB)

No re-authentication needed - using existing workspace credentials.

⚠️ Type "share" to update the library.
```

**Step 5: Deployment**
```
🚀 Updating Library

Executing: webflow library share

Output:
✓ Bundling library (312 KB)
✓ Using workspace: Acme Corp
✓ Uploading bundle
✓ Validating components
✓ Updating library
✓ Library updated successfully

✅ Library Updated: Acme Components

Changes deployed:
- Button: Updated ✨
- Form: Added 🆕
- Card: Unchanged
- Hero: Unchanged

💡 Refresh Webflow Designer to see changes:
1. Open Designer
2. Components may auto-refresh
3. Or refresh browser if needed

Components updated in workspace!
```

### Example 3: First-Time Bundle Testing

**User prompt:**
```
I want to test my bundle locally before sharing
```

**Step 1-2: Verification & Configuration**
```
🔍 Local Bundle Testing

✓ webflow.json configured
✓ Library: My Components
✓ Components: ./src/**/*.webflow.tsx

Running local bundle only (no deployment)...
```

**Step 3: Bundle Validation**
```
🔨 Building Components

Executing: npm run build
✓ Build complete

Creating local bundle...
Executing: webflow library bundle

Output:
✓ Analyzing components
✓ Bundling dependencies
✓ Optimizing output
✓ Bundle created: dist/bundle.js

📦 Bundle Details:

Size: 1.2 MB (✓ within 2MB limit)

Components (5):
├── Button.webflow.tsx (25 KB)
├── Card.webflow.tsx (18 KB)
├── Hero.webflow.tsx (45 KB)
├── Form.webflow.tsx (32 KB)
└── Modal.webflow.tsx (28 KB)

Dependencies:
├── react@18.2.0 (included)
├── react-dom@18.2.0 (included)
└── classnames@2.3.1 (included)

Output Directory: ./dist/
- bundle.js (1.2 MB)
- manifest.json

Validation: ✅ All checks passed

💡 Bundle is valid and ready to share!
   Run: webflow library share (when ready to deploy)
```

### Example 4: Bundle Too Large

**User prompt:**
```
Share my components library
```

**Bundle Validation Error:**
```
🔨 Building and Bundling

Executing: npm run build
✓ Build complete

Executing: webflow library bundle

Output:
✓ Analyzing components
✓ Bundling dependencies
⚠️ Bundle size check...

📦 Bundle Analysis:
- Size: 2.4 MB (❌ exceeds 2MB limit)
- Components: 6
- Dependencies: react@18.2.0, react-dom@18.2.0, lodash@4.17.21, moment@2.29.4
- Validation: ❌ Issues found

❌ Bundle Too Large

Current size: 2.4 MB
Maximum allowed: 2 MB
Exceeded by: 400 KB

📊 Size Breakdown:
- React + React DOM: ~800 KB
- lodash: ~500 KB ⚠️
- moment: ~350 KB ⚠️
- Your components: ~750 KB

💡 Recommendations:
1. Remove lodash (use native JS instead)
   - Replace _.map with Array.map
   - Replace _.filter with Array.filter
   - Or use lodash-es and import specific functions

2. Replace moment with lighter alternative
   - Use date-fns (~15 KB vs 350 KB)
   - Or use native Intl.DateTimeFormat

3. Optimize component code
   - Remove unused imports
   - Enable tree-shaking
   - Split large components

4. Use external assets
   - Host large images externally
   - Use CDN for static assets

Would you like to:
1. Continue anyway (using --force flag, not recommended)
2. Review component imports to optimize
3. Cancel and fix manually
```

### Example 5: CI/CD Deployment

**User prompt:**
```
How do I deploy in CI/CD pipeline?
```

**Response:**
```
🤖 CI/CD Deployment Setup

For automated deployments, use non-interactive mode with API tokens.

### Setup Steps:

1. **Get Workspace API Token**
   - Open Workspace Settings in Webflow
   - Go to Integrations → Workspace API Token
   - Generate new token
   - Copy token securely

2. **Add to CI/CD Secrets**
   - Add as environment variable: WORKSPACE_API_TOKEN
   - Never commit tokens to version control

3. **Deployment Command**
   ```bash
   webflow library share --api-token $WORKSPACE_API_TOKEN --no-input
   ```

### Example: GitHub Actions

```yaml
name: Deploy Components
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Install Webflow CLI
        run: npm install -g @webflow/webflow-cli

      - name: Build components
        run: npm run build

      - name: Deploy to Webflow
        run: |
          webflow library share \
            --api-token ${{ secrets.WORKSPACE_API_TOKEN }} \
            --no-input \
            --force
        env:
          WORKSPACE_API_TOKEN: ${{ secrets.WORKSPACE_API_TOKEN }}
```

### Multiple Workspaces:

```bash
# Deploy to workspace 1
webflow library share \
  --api-token $WORKSPACE_1_TOKEN \
  --no-input

# Deploy to workspace 2
webflow library share \
  --api-token $WORKSPACE_2_TOKEN \
  --no-input
```

### Options:
- `--no-input` - Disables interactive prompts
- `--force` - Continues even with warnings
- `--verbose` - Shows detailed output
- `--dev` - Bundles in development mode (for testing)

⚠️ Security:
- Never commit .env files
- Use secrets management in CI/CD
- Rotate tokens regularly
- Limit token permissions
```

## Guidelines

### Phase 1: CLI Verification

**Installation Check:**
```bash
# Check if CLI is installed
webflow --version

# If not installed, guide user:
npm install -g @webflow/webflow-cli
```

**Project Check:**
```bash
# Check for existing configuration
ls webflow.json

# Check for React project
ls package.json

# Check for components
ls src/
```

**Authentication Note:**
Unlike site authentication, workspace authentication for Code Components happens automatically on first `webflow library share`. The CLI will:
1. Open browser for authentication
2. Let user select workspace
3. Create .env with WEBFLOW_WORKSPACE_ID and WEBFLOW_WORKSPACE_API_TOKEN

### Phase 2: Project Configuration

**webflow.json Structure:**
```json
{
  "library": {
    "name": "<Your Library Name>",
    "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
    "bundleConfig": "./webpack.webflow.js"
  }
}
```

**Configuration Fields:**
- **name** (required): Library name as it appears in Webflow Designer
- **components** (required): Glob pattern matching component files
  - Example: `"./src/**/*.webflow.tsx"` - all .webflow.tsx files in src/
  - Example: `"./src/components/**/*.tsx"` - all .tsx files in src/components/
- **bundleConfig** (optional): Path to custom webpack configuration

**Component Naming Convention:**
- Add `.webflow` before extension: `Button.webflow.tsx`
- Or use glob pattern to include all files in specific directory
- Components must be React components

**No Init Command:**
Unlike other CLI products, Code Components don't have an `init` command. Users configure existing React projects by adding webflow.json with library configuration.

### Phase 3: Build & Bundle

**Build Process:**
```bash
# Use project's build script
npm run build
# or
yarn build
# or
pnpm build

# Check for errors
echo $?  # 0 = success, non-zero = failure
```

**Bundle Command:**
```bash
# Bundle locally (optional - for testing/validation)
webflow library bundle

# Bundle output: ./dist/ (default)
# Can override: webflow library bundle --output-path ./build
```

**Bundle Options:**
- `--output-path <path>` - Override output directory (default: `./dist`)
- `--public-path <path>` - Override public path
- `--force` - Force bundling even with warnings
- `--debug-bundler` - Show webpack configuration
- `--dev` - Bundle in development mode
- `--verbose` - Show detailed output

**Bundle Validation:**
Check these aspects:
- **Size limit**: Must be < 2MB
- **Dependencies**: React versions compatible
- **Output**: Bundle created in dist/ directory
- **Components**: All component files included

**Common Build Errors:**
- TypeScript compilation errors → Fix type issues
- Missing dependencies → Run npm install
- Import errors → Check file paths
- Bundle too large → Optimize dependencies

### Phase 4: Deployment Preview

**Preview Format:**
```
📋 Deployment Preview

Library: [Name from webflow.json]
Components: [Count] ([List of components])
Bundle Size: [Size in KB/MB]

Workspace Authentication:
[First time: Explain browser auth flow]
[Subsequent: Show workspace from .env]

Validation Status:
✓ Bundle size: [X KB] (< 2MB limit)
✓ Dependencies: Valid
✓ Configuration: webflow.json valid
✓ Components: [N] components found

⚠️ Type "share" to proceed
```

**First-Time Authentication:**
Explain clearly:
1. Browser will open
2. User authenticates with Webflow
3. User selects target workspace
4. CLI creates .env with credentials
5. Future shares use these credentials (no re-auth)

### Phase 5: Deployment Execution

**Share Command:**
```bash
# Standard share (interactive)
webflow library share

# Non-interactive (for CI/CD)
webflow library share --api-token <TOKEN> --no-input

# Force share (ignore warnings)
webflow library share --force

# Development mode
webflow library share --dev
```

**Share Options:**
- `--manifest` - Path to webflow.json (default: scans current directory)
- `--api-token` - Workspace API token (for CI/CD)
- `--no-input` - Disable interactive prompts
- `--force` - Force bundling even with warnings
- `--debug-bundler` - Show bundler configuration
- `--dev` - Bundle in development mode
- `--verbose` - Show detailed output

**Success Indicators:**
- Bundle uploaded successfully
- Library registered in workspace
- Components available in Designer
- .env file created/updated (first time)

**Environment File (.env):**
After first successful share:
```
WEBFLOW_WORKSPACE_ID=your-workspace-id
WEBFLOW_WORKSPACE_API_TOKEN=your-api-token
```

⚠️ **Critical**: Always add .env to .gitignore!

**Verification Steps:**
1. Check CLI output for success message
2. Verify .env file created (first time)
3. Provide Designer access instructions
4. Show workspace dashboard URL

### Phase 6: Debugging

**Log Command:**
```bash
# Show latest log file location
webflow library log

# Example output:
# Latest log: /Users/user/.webflow/logs/library-2024-01-20-15-30-45.log
```

Use this command when:
- Bundle fails with unclear error
- Share command produces warnings
- Need to debug webpack configuration
- Investigating dependency issues

**Common Issues:**

**Issue: "Could not find webflow.json"**
```
❌ Configuration Not Found

The CLI couldn't find webflow.json in the current directory.

Solution:
1. Ensure you're in the project root
2. Create webflow.json with library configuration:
   {
     "library": {
       "name": "Your Library Name",
       "components": ["./src/**/*.webflow.tsx"]
     }
   }
3. Run command again
```

**Issue: "No components found"**
```
❌ No Components Found

The components glob pattern didn't match any files.

Current pattern: "./src/**/*.webflow.tsx"

Solution:
1. Check component files have correct naming
2. Verify glob pattern in webflow.json
3. Common patterns:
   - "./src/**/*.webflow.tsx" (requires .webflow in name)
   - "./src/components/**/*.tsx" (all tsx in folder)
   - "./src/Button.tsx" (specific file)

Found files:
- src/Button.tsx (not matching pattern)
- src/Card.tsx (not matching pattern)

Suggestion: Rename to Button.webflow.tsx or update pattern
```


### Error Handling

**CLI Not Installed:**
```
❌ Webflow CLI Not Found

The Webflow CLI is required for Code Components.

Installation:
npm install -g @webflow/webflow-cli

After installation, verify:
webflow --version

Documentation: https://developers.webflow.com/cli
```



**Build Failures:**
```
❌ Build Failed

Error: [Specific error message]

Common Fixes:
- TypeScript errors: Review type definitions
- Missing deps: Run npm install
- Import errors: Check file paths
- Syntax errors: Check React component syntax

Show build output for details.
Need help? Run: webflow library log
```

**Bundle Failures:**
```
❌ Bundle Failed

Error: [Specific error from CLI]

Common Causes:
- Invalid component files
- Webpack configuration errors
- Dependency conflicts
- File path issues

View detailed logs: webflow library log

Possible solutions:
1. Check component file syntax
2. Verify webflow.json configuration
3. Remove bundleConfig to use defaults
4. Check dependencies in package.json
```

**Deployment Failures:**
```
❌ Share Failed

Error: [Specific error from CLI]

Possible Causes:
- Network connection issues
- Workspace authentication expired
- Bundle validation failed
- Workspace permissions

Solutions:
1. Check internet connection
2. Re-authenticate: Remove .env and run share again
3. Fix bundle issues: Run webflow library bundle first
4. Verify workspace access in Webflow dashboard

Retry share? (yes/no)
```

### File Operations

**Reading Files:**
Always use Read tool (never modify):
```
# View library configuration
Read: webflow.json

# View package dependencies
Read: package.json

# View component source
Read: src/Button.webflow.tsx

# View environment (if exists)
Read: .env
```

**Discovering Files:**
Use Glob tool to find files:
```
# Find all webflow components
Glob: **/*.webflow.tsx

# Find configuration files
Glob: *.json

# Find source files
Glob: src/**/*

# Find build output
Glob: dist/**/*
```

**Never Use Write/Edit Tools:**
- Don't create webflow.json with Write (show user the structure)
- Don't modify component files
- Don't edit package.json
- Let user make file changes
- Only read files to show content

### Progress Indicators

**For Bundling:**
```
🔄 Bundling Components...

Analyzing components... ✓
Resolving dependencies... ✓
Building bundle... ⏳
Optimizing... ⏳

Elapsed: 8s
```

**For Deployment:**
```
🚀 Sharing Library...

Creating bundle... ✓
Uploading to workspace... ⏳
Validating components... ⏳

Uploaded: 287 KB
Elapsed: 12s
```

### Safety Patterns

**Confirmation Keywords:**
- "share" - Share library to workspace
- "deploy" - Alternative to "share"
- "proceed" - Continue with operation
- "cancel" - Cancel operation
- "skip" - Skip optional step

**Preview Before Share:**
Always show:
- What will be shared (library name, components)
- Where it will go (workspace, or first-time auth needed)
- Bundle size and validation status
- Impact of changes (new/updated components)

**Transparency:**
- Show all CLI commands before execution
- Display CLI output in full
- Report success/failure clearly
- Provide troubleshooting guidance
- Show log location for debugging

### Best Practices

**Component Development:**
- Use TypeScript for type safety
- Follow React best practices
- Keep bundle size small (< 1MB ideal)
- Name files with .webflow extension for clarity
- Document component props

**Dependency Management:**
- Keep dependencies minimal
- Avoid large libraries (lodash, moment)
- Use tree-shakeable packages
- Check bundle impact: `webflow library bundle --verbose`
- Peer dependencies for React (not bundled)

**Updates and Versioning:**
- Build before sharing
- Test bundle locally: `webflow library bundle`
- Share to update: `webflow library share`
- No version numbers needed (always "latest")
- Test in Designer after deployment

**Workspace Management:**
- One workspace per .env file
- Use --api-token for multiple workspaces
- Add .env to .gitignore
- Rotate tokens in CI/CD
- Document which workspace is configured

**Configuration:**
- Keep webflow.json in project root
- Use clear library names
- Use specific component glob patterns
- Add bundleConfig only if needed
- Version control webflow.json (not .env)

### Component Lifecycle

**Initial Setup:**
1. Create/have React project
2. Add webflow.json with library configuration
3. Name component files (e.g., .webflow.tsx)
4. Build: `npm run build`
5. Test bundle: `webflow library bundle`
6. Share: `webflow library share` (authenticates first time)

**Making Updates:**
1. Edit component source files
2. Build: `npm run build`
3. Share: `webflow library share` (uses saved credentials)
4. Refresh Designer to see changes

**Testing:**
1. Bundle locally: `webflow library bundle`
2. Check bundle size and validation
3. Fix any issues
4. Share when ready: `webflow library share`
5. Open Webflow Designer
6. Add components to page
7. Test functionality

**Debugging:**
1. View logs: `webflow library log`
2. Bundle with verbose: `webflow library bundle --verbose`
3. Check configuration: cat webflow.json
4. Verify build: npm run build
5. Test in development mode: `webflow library share --dev`

### CLI Command Reference

**Installation:**
```bash
# Install CLI globally
npm install -g @webflow/webflow-cli

# Verify installation
webflow --version
```

**Library Commands:**
```bash
# Bundle locally (testing/validation)
webflow library bundle [options]

# Share to workspace (bundle + deploy)
webflow library share [options]

# View latest log file
webflow library log
```

**Bundle Options:**
```bash
# Custom output path
webflow library bundle --output-path ./build

# Force bundling (ignore warnings)
webflow library bundle --force

# Development mode
webflow library bundle --dev

# Show bundler config
webflow library bundle --debug-bundler

# Verbose output
webflow library bundle --verbose
```

**Share Options:**
```bash
# Standard interactive share
webflow library share

# Non-interactive (CI/CD)
webflow library share --no-input --api-token <TOKEN>

# Force share (ignore warnings)
webflow library share --force

# Development mode
webflow library share --dev

# Custom manifest location
webflow library share --manifest ./config/webflow.json
```

**Global Options:**
```bash
# Show version
webflow --version

# Show help
webflow --help
webflow library --help
webflow library share --help
```

## Quick Reference

**Workflow:** configure webflow.json → build → bundle → share

**Key Commands:**
- `webflow library bundle` - Bundle locally for testing
- `webflow library share` - Bundle and deploy to workspace
- `webflow library log` - View debug logs

**Configuration:** webflow.json with library section

**Authentication:** Automatic on first `webflow library share` (opens browser)

**Environment:** WEBFLOW_WORKSPACE_ID and WEBFLOW_WORKSPACE_API_TOKEN in .env

**Verification:** Always check `webflow --version` first

**Preview:** Show bundle details before sharing

**Confirmation:** Require "share" keyword to proceed

**Documentation:** https://developers.webflow.com/code-components/introduction



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 2/22: designer-extension-command -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-cli:designer-extension
description: Build Designer Extensions for custom Webflow Designer functionality. Lists available templates, initializes extension projects from templates (default/react/typescript-alt), bundles extensions for upload, and serves locally for development.
---

# Designer Extension

Create and develop Designer Extensions for Webflow with template selection, local development server, and bundling for distribution.

## Important Note

**ALWAYS use Bash tool for all Webflow CLI operations:**
- Execute `webflow extension` commands via Bash tool
- Use Read tool to examine generated files and schema (never modify)
- Use Glob tool to discover project files
- Verify CLI installation: `webflow --version`
- Check authentication: `webflow auth login` (if needed)
- DO NOT use Webflow MCP tools for CLI workflows
- All CLI commands require proper descriptions (not context parameters)

**Package Manager Detection:**
- Check for lock files: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn)
- If no lock file found, ask user which package manager to use (npm/pnpm/yarn)
- Use detected package manager for all install/build commands

## Instructions

### Phase 1: Environment Verification
1. **Verify CLI installed**: Run `webflow --version` to confirm CLI is installed
2. **Check project state**: Check if already in an extension project (look for webflow.json with extension schema)
3. **Identify operation type**: Determine if user wants to:
   - List available templates
   - Initialize new extension
   - Bundle existing extension
   - Serve extension locally

### Phase 2: Template Listing & Selection
4. **List templates** (if user asks or before init): Run `webflow extension list`
5. **Show available templates**:
   - `default` - Basic HTML/CSS/JavaScript template
   - `react` - React-based template
   - `typescript-alt` - Alternative TypeScript template
6. **Ask user to select template** if initializing new extension

### Phase 3: Extension Initialization
7. **Choose project name**: Ask user for project directory name
8. **Run init command**: Execute `webflow extension init <project-name> <template>`
9. **Read generated schema**: Use Read tool to examine webflow.json
10. **Show schema structure**: Display the 5 schema fields:
    - `name` (required) - Extension name as it appears in Webflow
    - `apiVersion` (required) - API version (2)
    - `publicDir` (required) - Directory to build from (dist)
    - `appIntents` (optional) - Element types that can create connections
    - `appConnections` (optional) - Connection configurations
11. **Install dependencies**: Run `npm install` in project directory

### Phase 4: Local Development
12. **Start dev server**: Execute `webflow extension serve [port]`
13. **Show dev server info**:
    - Default port: 1337 (unless user specifies different port)
    - Local URL: http://localhost:[port]
    - How to load in Designer
14. **Provide loading instructions**:
    - Open Webflow Designer
    - Load extension from local URL
    - Test functionality

### Phase 5: Bundling for Upload
15. **Run bundle command**: Execute `webflow extension bundle`
16. **Show bundle output**: Display bundle.zip location and size
17. **Provide upload instructions**: Guide for uploading to Webflow
18. **Document next steps**: Testing and distribution guidance

## Examples

### Example 1: List Available Templates

**User prompt:**
```
Show me the available Designer Extension templates
```

**Response:**
```
🔍 Designer Extension Templates

Listing available templates...
Executing: webflow extension list

Output:
Available templates:
1. default        - Basic HTML, CSS, and JavaScript
2. react          - React-based extension
3. typescript-alt - Alternative TypeScript template

To create a new extension:
webflow extension init <project-name> <template>

Example:
webflow extension init my-extension react
```

### Example 2: Initialize New Extension

**User prompt:**
```
Create a new Designer Extension called gallery-manager using React
```

**Step 1: Initialize Project**
```
📋 Initialize Designer Extension

Project name: gallery-manager
Template: react

Executing: webflow extension init gallery-manager react

Output:
✓ Created extension project at ./gallery-manager
✓ Generated project structure
✓ Created webflow.json with extension schema
✓ Set up React template

📁 Project Structure:
./gallery-manager/
├── webflow.json         # Extension schema
├── package.json         # Dependencies
├── src/
│   ├── index.html
│   ├── index.tsx
│   └── styles.css
├── dist/                # Build output
└── README.md

Installing dependencies...
Executing: cd gallery-manager && npm install

✓ Dependencies installed (45 packages)
```

**Step 2: Show Schema**
```
📋 Extension Schema (webflow.json)

Reading webflow.json...

{
  "name": "Gallery Manager",
  "apiVersion": "2",
  "publicDir": "dist",
  "appIntents": {},
  "appConnections": []
}

Schema Fields:
✓ name (required)      - Extension name in Webflow
✓ apiVersion (required) - API version: 2
✓ publicDir (required)  - Build directory: dist
  appIntents (optional) - Element connection types
  appConnections (optional) - Connection configs

Extension ready for development!
```

### Example 3: Serve Extension Locally

**User prompt:**
```
Run the extension on my local dev server
```

**Default Port (1337):**
```
🚀 Starting Development Server

Executing: webflow extension serve

Output:
✓ Building extension
✓ Starting dev server
✓ Extension ready

📋 Development Server Running

Local URL: http://localhost:1337
Status: ✓ Active

How to Load in Designer:
1. Open Webflow Designer
2. Open any site
3. Load extension from URL: http://localhost:1337

Press Ctrl+C to stop server
```

**Custom Port:**
```
User: "Run on port 3000 instead"

🚀 Starting Development Server

Executing: webflow extension serve 3000

Output:
✓ Building extension
✓ Starting dev server on port 3000
✓ Extension ready

📋 Development Server Running

Local URL: http://localhost:3000
Status: ✓ Active

Load in Designer: http://localhost:3000
```

### Example 4: Bundle Extension

**User prompt:**
```
Bundle my extension for upload
```

**Step 1: Bundle**
```
📦 Bundling Extension

Executing: webflow extension bundle

Output:
✓ Building production bundle
✓ Creating bundle.zip
✓ Bundle created successfully

Bundle Details:
- File: bundle.zip
- Location: ./dist/bundle.zip
- Size: 245 KB

✅ Bundle ready for upload!
```

**Step 2: Upload Instructions**
```
📤 Upload Instructions

Your extension is bundled and ready to upload.

Upload Steps:
1. Go to Webflow Designer Extensions dashboard
2. Upload bundle.zip
3. Test the extension
4. Submit for review (if distributing)

Bundle location: ./dist/bundle.zip
```

### Example 5: Complete Workflow

**User prompt:**
```
Create a new Designer Extension for managing colors
```

**Step 1: List Templates**
```
🔍 Designer Extension Workflow

First, let me show available templates.

Executing: webflow extension list

Available templates:
1. default        - Basic HTML/CSS/JavaScript
2. react          - React-based (recommended)
3. typescript-alt - TypeScript alternative

Which template would you like to use? (default/react/typescript-alt)
```

*User selects: react*

**Step 2: Initialize**
```
📋 Creating Extension

Project name: color-manager
Template: react

Executing: webflow extension init color-manager react

✓ Project created at ./color-manager
✓ webflow.json generated
✓ React template configured

Installing dependencies...
✓ npm install complete

📋 Extension Schema:
{
  "name": "Color Manager",
  "apiVersion": "2",
  "publicDir": "dist",
  "appIntents": {},
  "appConnections": []
}
```

**Step 3: Start Development**
```
🚀 Starting Dev Server

Executing: webflow extension serve

✓ Server running at http://localhost:1337

Load in Designer:
1. Open Webflow Designer
2. Load extension from: http://localhost:1337
3. Start developing!

Server running... (Press Ctrl+C to stop)
```

## Guidelines

### Phase 1: CLI Verification

**Installation Check:**
```bash
# Check if CLI is installed
webflow --version

# If not installed, guide user:
npm install -g @webflow/cli
```

**Authentication (if needed):**
```bash
# Site authentication if required
webflow auth login
```

### Phase 2: Template Management

**List Templates Command:**
```bash
webflow extension list
```

**Available Templates:**
- **default** - Basic HTML, CSS, and JavaScript template
- **react** - React-based extension with modern tooling
- **typescript-alt** - Alternative TypeScript template

### Phase 3: Initialization

**Init Command:**
```bash
webflow extension init <project-name> <template>
```

**Arguments:**
- `<project-name>` (required) - Name of the new project directory
- `<template>` (required) - One of: default, react, typescript-alt

**Example Commands:**
```bash
# Initialize with default template
webflow extension init my-extension default

# Initialize with React template
webflow extension init my-extension react

# Initialize with TypeScript template
webflow extension init my-extension typescript-alt
```

**Project Structure After Init:**
```
/project-name/
├── webflow.json         # Extension schema (required)
├── package.json         # Dependencies
├── src/                 # Source files
│   ├── index.html
│   ├── index.tsx (or .js)
│   └── styles.css
├── dist/                # Build output directory
└── README.md
```

### Phase 4: Extension Schema

**Schema in webflow.json:**
```json
{
  "name": "<Your Extension Name>",
  "apiVersion": "2",
  "publicDir": "dist",
  "appIntents": {
    "image": ["manage"],
    "form": ["manage"]
  },
  "appConnections": [
    "myAppImageConnection",
    "myAppFormConnection"
  ]
}
```

**Schema Fields:**

| Field            | Description                                         | Default | Required |
| ---------------- | --------------------------------------------------- | ------- | -------- |
| `name`           | Extension name as it appears in Webflow             | -       | Yes      |
| `apiVersion`     | API version to use for extension                    | `2`     | Yes      |
| `publicDir`      | Directory to build and serve extension from         | `dist`  | Yes      |
| `appIntents`     | Element types that can create connections           | `{}`    | No       |
| `appConnections` | Connection configurations for extension             | `[]`    | No       |

**Required Fields:**
- `name` - Must be unique and descriptive
- `apiVersion` - Currently must be "2"
- `publicDir` - Directory where built files are placed (default: "dist")

**Optional Fields:**
- `appIntents` - Defines which element types can connect to your extension
  - Example: `{"image": ["manage"], "form": ["manage"]}`
- `appConnections` - Array of connection identifiers
  - Example: `["myAppImageConnection", "myAppFormConnection"]`

### Phase 5: Local Development

**Serve Command:**
```bash
# Serve on default port (1337)
webflow extension serve

# Serve on custom port
webflow extension serve 3000
```

**Arguments:**
- `[port]` (optional) - Port number to serve on (default: 1337)

**Development Server:**
- Default URL: http://localhost:1337
- Custom port: http://localhost:[port]
- Auto-rebuilds on file changes
- Hot reload for faster development

**Loading in Designer:**
1. Open Webflow Designer
2. Open any site
3. Go to Extensions menu
4. Load extension from local URL: http://localhost:[port]
5. Extension appears in Designer

### Phase 6: Bundling

**Bundle Command:**
```bash
webflow extension bundle
```

**Output:**
- Creates `bundle.zip` file in project directory
- Contains all built files from `publicDir`
- Ready to upload to Webflow

**Bundle Contents:**
- Built JavaScript and CSS files
- HTML entry points
- Assets from publicDir
- Extension schema

### Error Handling

**CLI Not Installed:**
```
❌ Webflow CLI Not Found

Designer Extensions require the Webflow CLI.

Installation:
npm install -g @webflow/cli

After installation, verify:
webflow --version

Documentation: https://developers.webflow.com/cli
```

**Invalid Template:**
```
❌ Invalid Template

Error: Template "vue" not found

Available templates:
- default
- react
- typescript-alt

Retry with valid template:
webflow extension init my-extension react
```

**Port Already in Use:**
```
❌ Development Server Failed to Start

Error: Port 1337 is already in use

Solutions:
1. Stop other process on port 1337
2. Use different port:
   webflow extension serve 3000

Find process using port:
lsof -ti:1337 | xargs kill -9
```

**Missing webflow.json:**
```
❌ Extension Schema Not Found

Error: webflow.json not found in current directory

This directory is not an extension project.

Solutions:
1. Initialize new extension:
   webflow extension init <name> <template>
2. Navigate to existing extension directory
3. Create webflow.json with required schema
```

**Bundle Failed:**
```
❌ Bundle Creation Failed

Error: Build failed with errors

Common Causes:
- Missing dependencies (run: npm install)
- Build errors in source files
- Invalid webflow.json schema
- Missing publicDir directory

Fix errors and retry:
webflow extension bundle
```

### File Operations

**Reading Extension Files:**
Always use Read tool (never modify):
```
# View extension schema
Read: webflow.json

# View package dependencies
Read: package.json

# View source files
Read: src/index.html
Read: src/index.tsx
```

**Discovering Project Files:**
Use Glob tool to find files:
```
# Find all source files
Glob: src/**/*

# Find configuration files
Glob: *.json

# Find built files
Glob: dist/**/*
```

**Never Use Write/Edit Tools:**
- Don't create or modify webflow.json with Write tool
- Don't edit generated files
- Let CLI generate all project files
- Only read files to show content

### Progress Indicators

**For Init:**
```
📋 Creating Extension...

[████████████████████████] 100%

✓ Project created
✓ Dependencies installed
Elapsed: 12s
```

**For Bundle:**
```
📦 Bundling Extension...

[████████████████████████] 100%

✓ Bundle created: bundle.zip
Elapsed: 5s
```

**For Serve:**
```
🚀 Starting Server...

[████████████████████████] 100%

✓ Server ready at http://localhost:1337
Elapsed: 3s
```

### Best Practices

**Template Selection:**
- Use **react** template for modern component-based development
- Use **default** template for simple extensions or learning
- Use **typescript-alt** for TypeScript-based projects

**Development Workflow:**
1. List available templates
2. Initialize project with chosen template
3. Install dependencies
4. Serve locally for development
5. Test in Designer
6. Bundle for upload
7. Upload to Webflow

**Schema Configuration:**
- Always include required fields: name, apiVersion, publicDir
- Set appropriate appIntents if your extension connects to elements
- Define appConnections for element integrations
- Keep name descriptive and unique

**Local Development:**
- Use default port 1337 for consistency
- Keep dev server running during development
- Test frequently in Designer
- Check console for errors

**Bundling:**
- Bundle only when ready for upload or distribution
- Verify build completes without errors
- Check bundle.zip size
- Test bundled version before uploading

## Quick Reference

**Workflow:** list templates → init → serve → develop → bundle → upload

**Key Commands:**
- `webflow extension list` - Show available templates
- `webflow extension init <project-name> <template>` - Create new extension
- `webflow extension serve [port]` - Start dev server (default: 1337)
- `webflow extension bundle` - Create bundle.zip for upload

**Templates:** default, react, typescript-alt

**Schema Fields (webflow.json):**
- `name` (required) - Extension name
- `apiVersion` (required) - API version (2)
- `publicDir` (required) - Build directory
- `appIntents` (optional) - Element connection types
- `appConnections` (optional) - Connection configs

**Dev Server:** http://localhost:1337 (or custom port)

**Bundle Output:** bundle.zip in project directory

**Documentation:** https://developers.webflow.com/designer/reference/introduction



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 3/22: devlink-command -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-cli:devlink
description: Export Webflow Designer components to React/Next.js code for external projects. Configure devlink settings in webflow.json, sync design updates with devlink sync, validate generated code, show diffs, and provide integration examples. Use when building with Webflow designs in React/Next.js.
---

# DevLink

Export and sync Webflow Designer components to React/Next.js code with validation, diffs, and integration guidance.

## Important Note

**ALWAYS use Bash tool for all Webflow CLI operations:**
- Execute `webflow devlink sync` via Bash tool
- Use Read tool to examine synced files and webflow.json (never modify)
- Use Glob tool to discover generated components
- Verify CLI installation: `webflow --version`
- Check authentication: Use `webflow auth login` for site authentication
- DO NOT use Webflow MCP tools for CLI workflows
- All CLI commands require proper descriptions (not context parameters)

**Package Manager Detection:**
- Check for lock files: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn)
- If no lock file found, ask user which package manager to use (npm/pnpm/yarn)
- Use detected package manager for all install/build commands

## Instructions

### Phase 1: Environment Verification
1. **Verify CLI installed**: Run `webflow --version` to confirm CLI is installed
2. **Check authentication**: Verify site authentication (created via `webflow auth login`)
3. **Discover project state**: Check if webflow.json exists with devlink configuration
4. **Identify target framework**: Determine if React, Next.js, or other

### Phase 2: DevLink Configuration
5. **Check for existing config**: Look for `webflow.json` with devlink section
6. **Read configuration**: If exists, show current devlink settings:
   - `rootDir`: Directory to export components into
   - `cssModules`: Whether to use CSS modules
   - `fileExtensions`: File extensions for generated files
   - Other configuration options
7. **Ask operation type**: Clarify what user wants to do:
   - Configure DevLink for first time
   - Sync all components
   - Sync specific components (using `components` regex pattern)
   - Update existing sync
8. **Store baseline** (if updating): Use Read tool to capture current files before sync

### Phase 3: Sync Execution
9. **Run sync command**: Execute `webflow devlink sync` with options:
   - `--api-token` or `-t`: Override API token from .env
   - `--site-id` or `-s`: Override site ID from .env
10. **Monitor sync progress**: Show CLI output and sync status
11. **Capture sync results**: Record files created/modified in rootDir
12. **Validate generated code**:
    - Check for TypeScript errors (if using TS)
    - Verify import statements
    - Confirm component exports
    - Check CSS module references

### Phase 4: Analysis & Diff Preview
13. **Compare before/after**: Show what changed:
    - New files created in rootDir
    - Existing files modified
    - Components added or updated
14. **Show file diffs**: Display key changes for modified files
15. **Analyze component structure**:
    - Component count
    - New components added
    - Updated components
    - CSS files generated
16. **List dependencies**: Show what needs to be imported

### Phase 5: Integration Guidance
17. **Provide import statements**: Show exact code to import components
18. **Show usage examples**: Demonstrate how to use each component
19. **Document sync timestamp**: Record when sync occurred
20. **Provide next steps**: Guide user on testing and integration

## Examples

### Example 1: First-Time DevLink Setup

**User prompt:**
```
Sync my Webflow components to my Next.js project
```

**Step 1: Environment Verification**
```
🔍 DevLink Environment Check

Checking CLI installation...
✓ Webflow CLI installed: v1.5.2

Current directory: /Users/user/projects/my-nextjs-app
Framework detected: Next.js 14

Checking for DevLink configuration...
⚠️ No webflow.json with devlink configuration found

This appears to be your first DevLink sync.
Ready to configure? (yes/no)
```

*User confirms: yes*

**Step 2: Configuration Setup**
```
📋 DevLink Configuration

DevLink syncs Webflow components to your local project as React code.

Configuration needed in webflow.json:

{
  "devlink": {
    "rootDir": "./devlink",           // Where to export components
    "cssModules": true,                // Use CSS modules
    "fileExtensions": {
      "js": "jsx"                      // or "tsx" for TypeScript
    }
  }
}

I'll help you create this configuration.

Questions:
1. Where should components be exported? (default: ./devlink)
2. Use TypeScript? (yes for tsx, no for jsx)
3. Use CSS modules? (recommended: yes)
```

*User provides: ./src/devlink, yes (TypeScript), yes (CSS modules)*

```
Creating webflow.json configuration...

{
  "devlink": {
    "rootDir": "./src/devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "tsx"
    }
  }
}

✓ Configuration created

⚠️ Authentication Required:
DevLink needs your Webflow site ID and API token.

Run: webflow auth login
This will create a .env file with:
- WEBFLOW_SITE_ID
- WEBFLOW_SITE_API_TOKEN

After authentication, run sync again.
```

### Example 2: First Sync After Configuration

**User prompt:**
```
Run the DevLink sync
```

**Step 1: Verification**
```
🔍 DevLink Sync Check

Checking configuration...
✓ webflow.json found with devlink config
✓ Root directory: ./src/devlink
✓ CSS modules: enabled
✓ File extensions: tsx

Checking authentication...
✓ .env found with WEBFLOW_SITE_ID and WEBFLOW_SITE_API_TOKEN

Ready to sync components from Webflow.
```

**Step 2: Sync Execution**
```
🔄 Syncing Components

Executing: webflow devlink sync

Output:
✓ Connecting to Webflow site
✓ Fetching components
✓ Exporting components to ./src/devlink
✓ Generating React components
✓ Creating CSS module files
✓ Creating index file

Sync complete!

📁 Generated Files:
./src/devlink/
├── index.ts (module exports)
├── Navigation.tsx (component)
├── Navigation.module.css (styles)
├── Hero.tsx (component)
├── Hero.module.css (styles)
├── Footer.tsx (component)
├── Footer.module.css (styles)
└── _webflow-style.css (global styles)

📊 Sync Summary:
- Components synced: 3
- Files created: 8
- Total size: 45 KB
```

**Step 3: Integration Guidance**
```
✅ DevLink Sync Complete!

📋 Components Available:
1. Navigation
2. Hero
3. Footer

💡 How to Use:

Import components in your Next.js pages:
```tsx
import { Navigation, Hero, Footer } from './src/devlink'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Footer />
    </>
  )
}
```

Global Styles:
Import the global DevLink styles in your _app.tsx or layout:
```tsx
import '../src/devlink/_webflow-style.css'
```

📦 No additional dependencies required!
DevLink components use only React (already in your project).

🔄 Future Updates:
Run `webflow devlink sync` again to pull latest design changes.
```

### Example 3: Update Existing Sync

**User prompt:**
```
Sync latest changes from Webflow
```

**Step 1: Pre-Sync State**
```
🔍 DevLink Update Check

Current state:
✓ Configuration: ./src/devlink
✓ Existing components: 3 (Navigation, Hero, Footer)
✓ Last sync: 2 days ago

Capturing current state for comparison...
✓ Baseline captured
```

**Step 2: Sync**
```
🔄 Syncing Updates

Executing: webflow devlink sync

Output:
✓ Connecting to Webflow site
✓ Fetching components
✓ Detecting changes
✓ Updating components
✓ Regenerating files

Sync complete!
```

**Step 3: Diff Analysis**
```
📊 Sync Analysis

Changes detected:

Modified Components:
1. Navigation.tsx
   - Added new "Contact" link
   - Updated styles for mobile view

2. Hero.tsx
   - Changed heading text
   - Updated button styling

New Components:
3. CallToAction.tsx (new)
   - New CTA section added

Unchanged:
- Footer.tsx

📁 Files Updated:
- ./src/devlink/Navigation.tsx (modified)
- ./src/devlink/Navigation.module.css (modified)
- ./src/devlink/Hero.tsx (modified)
- ./src/devlink/Hero.module.css (modified)
- ./src/devlink/CallToAction.tsx (new)
- ./src/devlink/CallToAction.module.css (new)
- ./src/devlink/index.ts (updated exports)

✅ 3 components updated, 1 new component added

💡 New Component Available:
```tsx
import { CallToAction } from './src/devlink'

<CallToAction />
```
```

### Example 4: Sync Specific Components

**User prompt:**
```
Only sync the navigation component from Webflow
```

**Configuration Update:**
```
📋 Filtering Components

To sync only specific components, update webflow.json:

Current configuration:
{
  "devlink": {
    "rootDir": "./src/devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "tsx"
    }
  }
}

Add components regex pattern:
{
  "devlink": {
    "rootDir": "./src/devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "tsx"
    },
    "components": "Navigation"     // Regex pattern to match
  }
}

Pattern options:
- "Navigation" - Only Navigation component
- "Nav.*" - All components starting with "Nav"
- "Navigation|Footer" - Multiple specific components
- ".*" - All components (default)

Update webflow.json? (yes/no)
```

*User confirms: yes*

```
✓ Configuration updated

Syncing with filter: "Navigation"

Executing: webflow devlink sync

Output:
✓ Connecting to Webflow site
✓ Fetching components
✓ Applying filter: Navigation
✓ Exporting 1 component

📁 Generated:
./src/devlink/
├── index.ts
├── Navigation.tsx
└── Navigation.module.css

✅ Synced 1 component (Navigation only)
```

### Example 5: Override Site ID and Token

**User prompt:**
```
Sync from a different Webflow site
```

**Response:**
```
🔄 Sync from Different Site

To sync from a different site, use --site-id and --api-token options.

Get credentials:
1. Go to Webflow site settings
2. Get Site ID
3. Generate API token (if needed)

Sync command:
```bash
webflow devlink sync --site-id <SITE_ID> --api-token <API_TOKEN>
```

Example:
```bash
webflow devlink sync \
  --site-id 5f8a9b2c3d4e5f6g7h8i9j0k \
  --api-token wfp_1234567890abcdef
```

This overrides the .env file values for this sync only.

⚠️ Note: You can also:
1. Update .env file with new WEBFLOW_SITE_ID and WEBFLOW_SITE_API_TOKEN
2. Or maintain multiple .env files (.env.site1, .env.site2)
3. Then run: webflow devlink sync (uses .env)

Proceed with override? (yes/no)
```

### Example 6: TypeScript Configuration

**User prompt:**
```
Set up DevLink with TypeScript
```

**Response:**
```
📋 DevLink TypeScript Configuration

For TypeScript projects, configure file extensions:

webflow.json:
{
  "devlink": {
    "rootDir": "./src/devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "tsx"        // Use .tsx for TypeScript
    }
  }
}

Benefits:
✓ Type-safe components
✓ Better IDE support
✓ Auto-completion
✓ Compile-time error checking

After sync, components will be generated as:
- Navigation.tsx (instead of .jsx)
- Hero.tsx
- Footer.tsx

Usage with TypeScript:
```tsx
import { Navigation } from '@/src/devlink'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  )
}
```

Ready to sync? (yes/no)
```

## Guidelines

### Phase 1: CLI Verification

**Installation Check:**
```bash
# Check if CLI is installed
webflow --version

# If not installed, guide user:
npm install -g @webflow/webflow-cli
```

**Authentication Check:**
```bash
# Site authentication creates .env file
# Check for:
cat .env

# Should contain:
# WEBFLOW_SITE_ID=your-site-id
# WEBFLOW_SITE_API_TOKEN=your-token

# If missing, authenticate:
webflow auth login
```

### Phase 2: Configuration

**webflow.json DevLink Schema:**
```json
{
  "devlink": {
    "rootDir": "./devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "jsx"
    }
  }
}
```

**All Configuration Options:**

| Option | Description | Default | Required |
|--------|-------------|---------|----------|
| `host` | Webflow API host URL | `https://api.webflow.com` | No |
| `rootDir` | Directory to export components into | `./devlink` | Yes |
| `siteId` | Webflow site ID | `process.env.WEBFLOW_SITE_ID` | No |
| `authToken` | Webflow API authentication token | `process.env.WEBFLOW_SITE_API_TOKEN` | No |
| `cssModules` | Enable CSS modules for component styles | `true` | No |
| `allowTelemetry` | Allow anonymous usage analytics | `true` | No |
| `envVariables` | Inject environment variables into exported components | `{}` | No |
| `components` | Regex pattern to match components to export | `.*` | No |
| `overwriteModule` | Whether to overwrite the module file | `true` | No |
| `fileExtensions` | File extensions for exported components | `{ js: ".js", css: ".css" }` | No |
| `skipTagSelectors` | Exclude tag/ID/attribute selectors from global CSS | `false` | No |
| `relativeHrefRoot` | Control how relative `href` attributes are resolved | `/` | No |

**Common Configurations:**

**React with JavaScript:**
```json
{
  "devlink": {
    "rootDir": "./src/components/webflow",
    "cssModules": true,
    "fileExtensions": {
      "js": "jsx"
    }
  }
}
```

**Next.js with TypeScript:**
```json
{
  "devlink": {
    "rootDir": "./src/devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "tsx"
    }
  }
}
```

**Sync Specific Components:**
```json
{
  "devlink": {
    "rootDir": "./src/devlink",
    "cssModules": true,
    "components": "Navigation|Hero|Footer"
  }
}
```

### Phase 3: Sync Command

**Basic Sync:**
```bash
# Uses webflow.json config and .env credentials
webflow devlink sync
```

**Sync with Options:**
```bash
# Override site ID
webflow devlink sync --site-id 5f8a9b2c3d4e5f6g7h8i9j0k

# Override API token
webflow devlink sync --api-token wfp_1234567890abcdef

# Override both
webflow devlink sync \
  --site-id 5f8a9b2c3d4e5f6g7h8i9j0k \
  --api-token wfp_1234567890abcdef

# Short flags
webflow devlink sync -s <site-id> -t <api-token>
```

**Sync Options:**
- `--api-token` / `-t`: The API token to use, overriding the `.env` file
- `--site-id` / `-s`: The site ID to sync from, overriding the `.env` file

### Phase 4: Generated Files

**Directory Structure:**
After sync, rootDir contains:
```
./devlink/
├── index.ts                  // Module exports
├── ComponentName.tsx         // Component file
├── ComponentName.module.css  // Component styles (if cssModules: true)
├── AnotherComponent.tsx
├── AnotherComponent.module.css
└── _webflow-style.css        // Global Webflow styles
```

**Component Structure:**
Generated components are React functional components:
```tsx
import React from 'react'
import styles from './ComponentName.module.css'

export function ComponentName() {
  return (
    <div className={styles.container}>
      {/* Component markup */}
    </div>
  )
}
```

**Index File:**
Exports all components for easy importing:
```ts
export { ComponentName } from './ComponentName'
export { AnotherComponent } from './AnotherComponent'
```

### Error Handling

**CLI Not Installed:**
```
❌ Webflow CLI Not Found

The Webflow CLI is required for DevLink.

Installation:
npm install -g @webflow/webflow-cli

After installation, verify:
webflow --version

Documentation: https://developers.webflow.com/cli
```

**Not Authenticated:**
```
❌ Not Authenticated

DevLink needs authentication to access your Webflow site.

Steps:
1. Run: webflow auth login
2. Follow authentication prompts in browser
3. Select your site when prompted
4. Verify: .env file created with:
   - WEBFLOW_SITE_ID
   - WEBFLOW_SITE_API_TOKEN
5. Retry sync

Need help? https://developers.webflow.com/cli/authentication
```

**No Configuration:**
```
❌ DevLink Not Configured

No webflow.json with devlink configuration found.

Create webflow.json in project root:
{
  "devlink": {
    "rootDir": "./devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "jsx"  // or "tsx" for TypeScript
    }
  }
}

Required fields:
- rootDir: Where to export components

After configuration, run: webflow devlink sync
```

**Sync Failures:**
```
❌ Sync Failed

Error: [Specific error from CLI]

Common Causes:
- Network connection issues
- Invalid site ID or API token
- Insufficient permissions
- Site has no components to export

Solutions:
1. Check internet connection
2. Verify credentials in .env
3. Check site permissions in Webflow
4. Ensure site has published components
5. Try: webflow devlink sync --site-id <id> --api-token <token>

Retry sync? (yes/no)
```

**Invalid Site ID:**
```
❌ Invalid Site ID

The provided site ID is invalid or inaccessible.

Check:
1. Verify WEBFLOW_SITE_ID in .env
2. Ensure you have access to the site
3. Check site ID in Webflow dashboard

Get site ID:
1. Open site in Webflow
2. Go to Site Settings
3. Find Site ID in General tab

Update .env and retry sync.
```

### File Operations

**Reading Files:**
Always use Read tool (never modify):
```
# View DevLink configuration
Read: webflow.json

# View environment
Read: .env

# View generated component
Read: ./devlink/Navigation.tsx

# View generated styles
Read: ./devlink/Navigation.module.css
```

**Discovering Files:**
Use Glob tool to find files:
```
# Find all generated components
Glob: ./devlink/**/*.tsx

# Find all CSS modules
Glob: ./devlink/**/*.module.css

# Find configuration
Glob: webflow.json
```

**Never Use Write/Edit Tools:**
- Don't create webflow.json with Write (show user the structure)
- Don't modify generated components
- Let CLI handle file generation
- Only read files to show content and diffs

### Progress Indicators

**For Sync:**
```
🔄 Syncing Components...

Connecting to Webflow... ✓
Fetching components... ✓
Generating React code... ⏳
Creating CSS modules... ⏳

Processed: 3/5 components
Elapsed: 8s
```

### Best Practices

**Configuration:**
- Keep webflow.json in project root
- Use TypeScript (.tsx) for better type safety
- Enable CSS modules for scoped styling
- Use specific component regex patterns for large sites

**Development Workflow:**
1. Design in Webflow Designer
2. Publish changes
3. Run `webflow devlink sync`
4. Review diffs before integrating
5. Test components in your app

**Integration:**
- Import global styles (_webflow-style.css) in app entry point
- Import components where needed
- Don't modify generated files (will be overwritten)
- Wrap DevLink components if customization needed

**Version Control:**
- Commit webflow.json
- Add .env to .gitignore
- Commit generated devlink/ directory (or add to .gitignore)
- Document last sync timestamp

**Multiple Sites:**
- Use different rootDir for each site
- Or use `components` pattern to filter
- Override credentials with --site-id and --api-token
- Maintain separate .env files

## Quick Reference

**Workflow:** configure webflow.json → authenticate → sync

**Key Commands:**
- `webflow devlink sync` - Sync components from Webflow
- `webflow devlink sync -s <id> -t <token>` - Sync with overrides

**Sync Options:**
- `-s` / `--site-id` - Override site ID
- `-t` / `--api-token` - Override API token

**Configuration:** webflow.json with devlink section

**Schema (Required):**
```json
{
  "devlink": {
    "rootDir": "./devlink"  // Required
  }
}
```

**Schema (Common):**
```json
{
  "devlink": {
    "rootDir": "./devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "jsx"  // or "tsx"
    }
  }
}
```

**Authentication:** Site authentication via `webflow auth login`

**Environment:** WEBFLOW_SITE_ID and WEBFLOW_SITE_API_TOKEN in .env

**Verification:** Check `webflow --version` and site authentication first

**Generated Files:** React components in rootDir with CSS modules

**Documentation:** https://developers.webflow.com/devlink



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 4/22: webflow-cli-troubleshooter -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-cli:troubleshooter
description: Diagnose and fix Webflow CLI issues including installation problems, authentication failures, build errors, and bundle problems. Uses CLI diagnostic flags (--version, --help, --verbose, --debug-bundler) for troubleshooting.
---

# Webflow CLI Troubleshooter

Diagnose and resolve Webflow CLI issues with diagnostic commands and automated fixes.

## Important Note

**ALWAYS use Bash tool for all diagnostic operations:**
- Execute diagnostic commands via Bash tool
- Use Read tool to examine configuration files
- Verify CLI installation: `webflow --version`
- Check authentication: `webflow auth login` (if needed)
- Use CLI diagnostic flags: `--verbose`, `--debug-bundler`, `--help`
- DO NOT use Webflow MCP tools for CLI workflows
- All CLI commands require proper descriptions (not context parameters)

**Package Manager Detection:**
- Check for lock files: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn)
- If no lock file found, ask user which package manager to use (npm/pnpm/yarn)
- Use detected package manager for all install/build commands

## Instructions

### Phase 1: Issue Identification
1. **Ask user to describe issue**: What command failed or what error occurred
2. **Determine error category**:
   - CLI not installed or wrong version
   - Authentication failed
   - Build/bundle failed
   - Command not recognized
3. **Capture error message**: Get exact error output

### Phase 2: Run Diagnostics
4. **Check CLI installation**: Run `webflow --version`
5. **Check authentication**: Run `webflow auth login` if needed
6. **Run command with --verbose**: Execute failed command with `--verbose` flag for detailed output
7. **Use --debug-bundler** (if bundle issue): Run with `--debug-bundler` flag to see bundler config
8. **Check --help**: Run `webflow <command> --help` to verify command syntax

### Phase 3: Analyze & Fix
9. **Identify root cause**: Parse error messages and diagnostic output
10. **Present fix**: Show specific solution based on CLI error
11. **Apply fix**: Execute fix commands
12. **Verify**: Re-run original command to confirm resolution

## Examples

### Example 1: CLI Not Installed

**User prompt:**
```
Getting "webflow: command not found"
```

**Diagnostics:**
```
🔍 Checking CLI Installation

Executing: webflow --version

Error: bash: webflow: command not found

❌ Webflow CLI not installed
```

**Fix:**
```
📋 Fix: Install Webflow CLI

Executing: npm install -g @webflow/cli

✓ CLI installed

Verifying...
Executing: webflow --version

Output: @webflow/cli/1.5.2

✅ Issue resolved
```

### Example 2: Build Failed

**User prompt:**
```
Build is failing but I don't know why
```

**Diagnostics:**
```
🔍 Running Build with Diagnostics

Executing: webflow library bundle --verbose

Output:
[verbose] Loading webflow.json
[verbose] Found library config
[verbose] Building components from ./src/**/*.webflow.tsx
[verbose] Running bundler
Error: Failed to resolve import './missing-file.ts'

❌ Build failed: Missing import file
```

**Fix:**
```
📋 Fix: Missing Import

Issue: Component imports './missing-file.ts' which doesn't exist

Solutions:
1. Create the missing file
2. Fix the import path
3. Remove the import if not needed

Check your component imports and ensure all files exist.
```

### Example 3: Bundle Configuration Issue

**User prompt:**
```
Bundle is failing with webpack errors
```

**Diagnostics:**
```
🔍 Checking Bundle Configuration

Executing: webflow library bundle --debug-bundler

Output:
[debug-bundler] Final bundler configuration:
{
  "entry": "./src/Component.tsx",
  "output": {
    "path": "/dist",
    "filename": "bundle.js"
  },
  "resolve": {
    "extensions": [".ts", ".tsx", ".js"]
  }
}

Error: Module not found: Can't resolve 'styled-components'

❌ Bundle failed: Missing dependency
```

**Fix:**
```
📋 Fix: Install Missing Dependency

Executing: npm install styled-components

✓ Dependency installed

Retrying bundle...
Executing: webflow library bundle

✓ Bundle created successfully

✅ Issue resolved
```

## Guidelines

### CLI Diagnostic Commands

**Version Check:**
```bash
webflow --version
# or
webflow -V
```

**Command Help:**
```bash
webflow --help                    # General help
webflow library --help            # Library commands help
webflow library bundle --help     # Specific command help
```

**Verbose Output:**
```bash
# Add --verbose to any command for detailed debugging
webflow library bundle --verbose
webflow cloud deploy --verbose
webflow extension bundle --verbose
```

**Debug Bundler:**
```bash
# Show final bundler configuration
webflow library bundle --debug-bundler
webflow extension bundle --debug-bundler
```

### Common Issues & Fixes

**Issue: CLI Not Found**
- **Diagnostic:** `webflow --version` fails
- **Fix:** `npm install -g @webflow/cli`
- **Verify:** `webflow --version` shows version

**Issue: Wrong CLI Version**
- **Diagnostic:** `webflow --version` shows old version
- **Fix:** `npm update -g @webflow/cli`
- **Verify:** Latest version installed

**Issue: Command Not Recognized**
- **Diagnostic:** "Unknown command" error
- **Fix:** Check command with `webflow --help`
- **Verify:** Use correct command syntax

**Issue: Authentication Failed**
- **Diagnostic:** "Not authenticated" error
- **Fix:** `webflow auth login`
- **Verify:** Authentication succeeds

**Issue: Build Failed**
- **Diagnostic:** Run with `--verbose` flag
- **Fix:** Fix errors shown in verbose output
- **Verify:** Build succeeds

**Issue: Bundle Configuration Error**
- **Diagnostic:** Run with `--debug-bundler` flag
- **Fix:** Adjust bundler config in webflow.json
- **Verify:** Bundle succeeds

**Issue: Missing Dependencies**
- **Diagnostic:** "Module not found" errors
- **Fix:** `npm install` or install specific package
- **Verify:** Build/bundle succeeds

**Issue: Corrupted node_modules**
- **Diagnostic:** Unexplained build failures
- **Fix:** `rm -rf node_modules && npm install`
- **Verify:** Build succeeds

### Error Handling

**CLI Not Installed:**
```
❌ Webflow CLI Not Found

Install:
npm install -g @webflow/cli

Verify:
webflow --version

Docs: https://developers.webflow.com/cli
```

**Authentication Required:**
```
❌ Authentication Failed

Fix:
webflow auth login

Follow browser prompts to authenticate
```

**Build/Bundle Failed:**
```
❌ Build Failed

Run with diagnostics:
webflow library bundle --verbose --debug-bundler

This shows:
- Detailed build steps
- Import resolution
- Bundler configuration
- Exact error location

Fix the errors shown in output
```

**Unknown Error:**
```
❌ Unknown Issue

Gather info:
1. What command are you running?
2. Run command with --verbose flag
3. Check command syntax with --help
4. Share full error output

This helps identify the specific problem
```

### File Operations

**Reading Config Files:**
```
# View webflow.json
Read: webflow.json

# View package.json
Read: package.json

# View build output
Read: dist/
```

**Discovering Files:**
```
# Find config files
Glob: **/webflow.json

# Find components
Glob: src/**/*.webflow.tsx

# Find logs
Glob: **/*.log
```

### Best Practices

**Always Start With:**
1. Check CLI version: `webflow --version`
2. Check command syntax: `webflow <command> --help`
3. Run with verbose: Add `--verbose` flag

**For Build/Bundle Issues:**
1. Use `--verbose` for detailed output
2. Use `--debug-bundler` to see config
3. Check import paths
4. Verify dependencies installed

**For Authentication Issues:**
1. Run `webflow auth login`
2. Follow browser prompts
3. Verify workspace access

**For Installation Issues:**
1. Check Node.js version: `node --version`
2. Install CLI globally: `npm install -g @webflow/cli`
3. Verify installation: `webflow --version`

## Quick Reference

**Workflow:** identify → diagnose → fix → verify

**Diagnostic Flags:**
- `--version` / `-V` - Check CLI version
- `--help` / `-h` - Show command help
- `--verbose` - Detailed debugging output
- `--debug-bundler` - Show bundler config

**Common Fixes:**
- Not installed → `npm install -g @webflow/cli`
- Wrong version → `npm update -g @webflow/cli`
- Auth failed → `webflow auth login`
- Build failed → Check `--verbose` output
- Bundle error → Check `--debug-bundler` output
- Missing deps → `npm install`

**Documentation:** https://developers.webflow.com/cli



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 5/22: webflow-cloud-command -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-cli:cloud
description: Initialize, build, and deploy full-stack Webflow applications to Webflow Cloud hosting. List available templates, initialize projects with cloud init, and deploy with comprehensive validation. Use when creating or deploying Webflow Cloud applications.
---

# Webflow Cloud

Initialize new projects from templates, build applications, and deploy to Webflow Cloud with comprehensive validation and deployment verification.

## Important Note

**ALWAYS use Bash tool for all Webflow CLI operations:**
- Execute `webflow cloud` commands via Bash tool
- Use Read tool to examine configuration files (never modify)
- Use Glob tool to discover project files
- Verify CLI installation: `webflow --version`
- Check authentication: Use `webflow auth login` for site authentication
- DO NOT use Webflow MCP tools for CLI workflows
- All CLI commands require proper descriptions (not context parameters)

**Non-Interactive Deployment (CRITICAL for agents and automation):**
The Webflow CLI is interactive by default (environment selection prompts, mount path prompts, update checks). Since AI agents and CI/CD pipelines cannot interact with interactive prompts, you MUST always use these flags together for deployment:
- `--no-input` — Disables all interactive prompts (environment selection, confirmations, etc.)
- `--mount <MOUNT_PATH>` — REQUIRED with `--no-input` to avoid `ENVIRONMENT_MOUNT_MISMATCH` errors. You MUST determine the correct mount path before deploying — see below.
- `--skip-mount-path-check` — Skips interactive mount path validation
- `--skip-update-check` — Skips the interactive package update check

**Determining the mount path (NEVER assume a default):**
The mount path varies between projects (e.g., `/app`, `/`, `/blog`). Assuming a common default like `/app` WILL cause deployment failures if the project uses a different path. The Webflow CLI does NOT persist the mount path to `webflow.json` after init or deploy, so it is often not available in local config. Follow these steps in order:
1. **Check `webflow.json`** — Read the `cloud` section and look for a `mount` or `mountPath` field. It is usually NOT present, but check anyway.
2. **Ask the user** — If the mount path is not in `webflow.json` (which is the common case), you MUST ask the user before deploying: _"What mount path does this project use? (e.g., /app, /, /blog)"_. Do NOT guess, do NOT assume `/app`, and do NOT proceed without a confirmed mount path.

The canonical non-interactive deploy command is:
```bash
webflow cloud deploy --no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check
```
Add `--auto-publish` if the user wants changes published immediately.

**Package Manager Detection:**
- Check for lock files: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn)
- If no lock file found, ask user which package manager to use (npm/pnpm/yarn)
- Use detected package manager for all install/build commands

## Instructions

### Phase 1: Determine Operation Type
1. **Identify user intent**: What does the user want to do?
   - List available project templates (`cloud list`)
   - Initialize new Cloud project (`cloud init`)
   - Deploy existing Cloud project (`cloud deploy`)
2. **Verify CLI installed**: Run `webflow --version` to confirm CLI is installed
3. **Check project state**: Determine if in existing project or starting new

### Phase 2A: List Templates (if needed)
4. **List available templates**: Run `webflow cloud list`
5. **Show template options**: Display available frameworks (Astro, Next.js, etc.)
6. **Explain templates**: Brief description of each template

### Phase 2B: Initialize New Project (if needed)
7. **Run cloud init**: Execute `webflow cloud init` with options:
   - `--framework` or `-f`: Choose framework (astro, nextjs)
   - `--mount` or `-m`: Mount path (e.g., `/app`)
   - `--site-id` or `-s`: Webflow site ID to connect
8. **Monitor initialization**: Show CLI output
9. **Verify project created**: Check for webflow.json and project structure
10. **Show configuration**: Read and display webflow.json with cloud section

### Phase 2C: Validate Existing Project (if deploying)
11. **Check authentication**: Verify site authentication (created via `webflow auth login`)
12. **Read project configuration**: Examine `webflow.json` cloud section:
    - `projectId`: Cloud project identifier (set automatically on first deploy)
    - `framework`: Either "nextjs" or "astro"
    - `mount` or `mountPath`: Mount path (may or may not be present)
13. **Determine mount path**: Follow the "Determining the mount path" steps above. If the mount path is not in `webflow.json`, ask the user before proceeding. NEVER default to `/app` or any other value.
14. **Validate project structure**:
    - Required files present
    - Build scripts configured
    - webflow.json has cloud configuration

### Phase 3: Build Execution (for deployment)
14. **Run build command**: Execute `npm run build` or configured build script
15. **Monitor build progress**: Show build output and detect errors
16. **Validate build output**:
    - Build artifacts created
    - Output directory exists
    - No critical errors

### Phase 4: Deployment Preview (for deployment)
17. **Show deployment summary**:
    - Project name and framework
    - Build output location
    - Environment configuration (if using --env)
    - Mount path (if specified)
    - Auto-publish setting (if using --auto-publish)
18. **Explain deployment process**: What happens during deployment
19. **Require explicit confirmation**: User must type "deploy" to proceed

### Phase 5: Deployment Execution
20. **Execute deploy command**: Run `webflow cloud deploy` with non-interactive flags:
    - `--no-input`: REQUIRED — disables all interactive prompts
    - `--mount` or `-m`: REQUIRED — mount path (e.g., `/app`). Must match the existing environment's mount path.
    - `--skip-mount-path-check`: REQUIRED — skips interactive mount path validation
    - `--skip-update-check`: RECOMMENDED — skips interactive package update check
    - `--auto-publish`: Optional — publish site after deployment
    - `--project-name` or `-p`: Project name (for new projects only)
    - `-e` or `--environment`: Environment name (defaults to first available with `--no-input`)
21. **Monitor deployment progress**: Show CLI output and deployment stages
22. **Verify deployment success**: Confirm deployment completed
23. **Provide post-deployment information**:
    - Deployment success message
    - Site URL (if published)
    - Next steps

## Examples

### Example 1: List Available Templates

**User prompt:**
```
What Webflow Cloud templates are available?
```

**Response:**
```
📋 Webflow Cloud Templates

Listing available templates...
Executing: webflow cloud list

Output:
Available templates:
1. astro - Astro framework template
2. nextjs - Next.js framework template

Use these templates with:
webflow cloud init -f <template-name>

Example:
webflow cloud init -f astro -m /app
```

### Example 2: Initialize New Cloud Project

**User prompt:**
```
Create a new Webflow Cloud project with Astro
```

**Step 1: Verify CLI**
```
🔍 Webflow CLI Check

Checking CLI installation...
✓ Webflow CLI installed: v1.5.2

Ready to initialize Webflow Cloud project with Astro.

Options needed:
1. Mount path (where project will be accessible, e.g., /app)
2. Site ID (optional - Webflow site to connect to)

Would you like to initialize with default settings (/app mount path)?
```

*User confirms: yes*

**Step 2: Initialize Project**
```
🚀 Initializing Webflow Cloud Project

Executing: webflow cloud init -f astro -m /app

Output:
✓ Creating new Astro project
✓ Installing dependencies
✓ Configuring Webflow Cloud
✓ Creating webflow.json

Project initialized!

📁 Project Structure:
/my-cloud-project/
├── webflow.json (Cloud configuration)
├── package.json
├── src/
│   └── pages/
│       └── index.astro
├── public/
└── astro.config.mjs

📋 Configuration (webflow.json):
{
  "cloud": {
    "projectId": "", // Will be set on first deploy
    "framework": "astro"
  }
}

✅ Project Ready!

Next Steps:
1. Build your application: npm run dev
2. Add your code to src/
3. Deploy: webflow cloud deploy
```

### Example 3: Initialize with Site ID

**User prompt:**
```
Initialize Cloud project with Next.js for site ID abc123
```

**Response:**
```
🚀 Initializing Webflow Cloud Project

Framework: Next.js
Mount Path: /app
Site ID: abc123

Executing: webflow cloud init -f nextjs -m /app -s abc123

Output:
✓ Creating new Next.js project
✓ Connecting to site: abc123
✓ Installing dependencies
✓ Configuring Webflow Cloud
✓ Creating webflow.json
✓ Authenticating with site

Project initialized and connected to site!

📋 Configuration (webflow.json):
{
  "cloud": {
    "projectId": "",
    "framework": "nextjs"
  }
}

📁 Environment (.env):
WEBFLOW_SITE_ID=abc123
WEBFLOW_SITE_API_TOKEN=************

⚠️ Important: Add .env to your .gitignore file!

✅ Ready to develop and deploy!
```

### Example 4: First Deployment

**User prompt:**
```
Deploy my Webflow Cloud app
```

**Step 1: Environment Verification**
```
🔍 Webflow Cloud Deployment Check

Checking CLI installation...
✓ Webflow CLI installed: v1.5.2

Checking project configuration...
✓ webflow.json found
✓ Cloud configuration present

Configuration:
- Framework: astro
- Project ID: (will be set on first deploy)
- Mount path: /app

Checking authentication...
⚠️ No authentication found - will authenticate during deploy

Checking build...
```

**Step 2: Build**
```
🔨 Building Application

Executing: npm run build

Output:
✓ Building for production
✓ Compiling pages
✓ Optimizing assets
✓ Build complete

Build output: ./dist (1.2 MB)
```

**Step 3: Deployment Preview**
```
📋 Deployment Preview

Project: Acme Cloud App (new deployment)
Framework: Astro
Mount Path: /app

First Deployment:
⚠️ This is your first deployment. The CLI will:
1. Authenticate with your Webflow site
2. Create project in Webflow Cloud
3. Set projectId in webflow.json
4. Deploy application

⚠️ Type "deploy" to proceed with deployment.
```

*User confirms: deploy*

**Step 4: Deployment**
```
🚀 Deploying to Webflow Cloud

Executing: webflow cloud deploy --no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check

Output:
✓ Authenticating with Webflow...
✓ Site authenticated
✓ Creating Cloud project
✓ Uploading build artifacts (1.2 MB)
✓ Deploying to Webflow Cloud
✓ Deployment complete

✅ Deployment Successful!

Project ID: proj_abc123xyz (added to webflow.json)
Deployment: https://acme-site.webflow.io/app

📋 Next Steps:
1. Visit your deployed app at the URL above
2. Future deploys will use saved project ID
3. Use: webflow cloud deploy (no re-auth needed)
4. Publish your site to make changes live

Updated webflow.json:
{
  "cloud": {
    "projectId": "proj_abc123xyz",
    "framework": "astro"
  }
}
```

### Example 5: Update Existing Deployment

**User prompt:**
```
Deploy updates to my Cloud app
```

**Verification & Build:**
```
🔍 Cloud Project Check

✓ webflow.json found
✓ Project ID: proj_abc123xyz
✓ Framework: astro
✓ Authentication: Valid

Building application...
Executing: npm run build
✓ Build complete (1.3 MB)
```

**Preview:**
```
📋 Deployment Preview

Project: proj_abc123xyz
Framework: Astro
Mount Path: /app

Deployment Type: Update existing project
Authentication: Using saved credentials

⚠️ Type "deploy" to proceed.
```

*User confirms: deploy*

**Deployment:**
```
🚀 Updating Cloud Deployment

Executing: webflow cloud deploy --no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check

Output:
✓ Using project: proj_abc123xyz
✓ Uploading build artifacts (1.3 MB)
✓ Deploying to Webflow Cloud
✓ Deployment complete

✅ Deployment Updated!

Live at: https://acme-site.webflow.io/app
Changes deployed successfully!

💡 Publish your site to make updates live.
```

### Example 6: CI/CD Deployment

**User prompt:**
```
How do I deploy in CI/CD pipeline?
```

**Response:**
```
🤖 CI/CD Deployment for Webflow Cloud

For automated deployments, use non-interactive mode with options.

### Setup Steps:

1. **Authenticate Locally First**
   Run once to create .env file:
   ```bash
   webflow auth login
   ```

2. **Add Credentials to CI/CD**
   Add these environment variables from .env:
   - WEBFLOW_SITE_ID
   - WEBFLOW_SITE_API_TOKEN

3. **Deployment Command**
   ```bash
   webflow cloud deploy --no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check --auto-publish
   ```

### Example: GitHub Actions

```yaml
name: Deploy to Webflow Cloud
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Install Webflow CLI
        run: npm install -g @webflow/webflow-cli

      - name: Build application
        run: npm run build

      - name: Deploy to Webflow Cloud
        run: |
          webflow cloud deploy \
            --no-input \
            --mount /app \
            --skip-mount-path-check \
            --skip-update-check \
            --auto-publish
        env:
          WEBFLOW_SITE_ID: ${{ secrets.WEBFLOW_SITE_ID }}
          WEBFLOW_SITE_API_TOKEN: ${{ secrets.WEBFLOW_SITE_API_TOKEN }}
```

### Deploy Options:

**Environment Management:**
```bash
# Deploy to specific environment
webflow cloud deploy --no-input -e staging -m <MOUNT_PATH> --skip-mount-path-check --skip-update-check

# Deploy to production with auto-publish
webflow cloud deploy --no-input -e production -m <MOUNT_PATH> --skip-mount-path-check --skip-update-check --auto-publish
```

**New Project Deployment:**
```bash
# Deploy new project with name and description
webflow cloud deploy --no-input \
  --project-name "Acme App" \
  --description "Production deployment" \
  --mount <MOUNT_PATH> \
  --skip-mount-path-check \
  --skip-update-check \
  --auto-publish
```

### Key Options:
- `--env` / `-e` - Environment name
- `--mount` / `-m` - Mount path (e.g., /app)
- `--project-name` / `-p` - Project name (new projects)
- `--directory` / `-d` - Project directory path
- `--description` - Project description
- `--skip-mount-path-check` - No prompts
- `--auto-publish` - Publish after deploy

⚠️ Security:
- Never commit .env files
- Use CI/CD secrets for credentials
- Rotate tokens regularly
```

## Guidelines

### Phase 1: Operation Detection

**Determine User Intent:**
Ask clarifying questions if unclear:
- "Do you want to create a new Cloud project or deploy an existing one?"
- "Which framework would you like to use? (Run 'webflow cloud list' to see options)"

**CLI Verification:**
```bash
# Check CLI installed
webflow --version

# If not installed:
npm install -g @webflow/webflow-cli
```

### Phase 2A: Template Listing

**List Templates Command:**
```bash
# Show available templates
webflow cloud list

# Output shows available frameworks (astro, nextjs)
```

**Template Information:**
- **Astro**: Static site generator, great for content-focused sites
- **Next.js**: React framework, supports SSR and SSG

### Phase 2B: Project Initialization

**Init Command Structure:**
```bash
# Basic init with framework
webflow cloud init -f <framework>

# With mount path
webflow cloud init -f astro -m /app

# With site ID (connects to specific site)
webflow cloud init -f nextjs -m /app -s <site-id>
```

**Init Options:**
- `--framework` / `-f` (required): astro or nextjs
- `--mount` / `-m`: Mount path (default prompts)
- `--site-id` / `-s`: Connect to specific site

**After Init:**
1. Verify webflow.json created
2. Check cloud configuration
3. Show project structure
4. Guide user to next steps (build, develop, deploy)

### Phase 2C: Project Validation

**webflow.json Cloud Schema:**
```json
{
  "cloud": {
    "projectId": "<Project ID>",  // Auto-set on first deploy
    "framework": "astro"           // or "nextjs"
  }
}
```

**Configuration Fields:**
- **projectId**: Cloud project identifier (automatically set by CLI on first deploy)
- **framework**: Framework preset - either "nextjs" or "astro"
- **mount path**: NOT stored in webflow.json by the CLI. You must ask the user for it if deploying an existing project.

**Authentication Check:**
```bash
# Site authentication creates .env file
# Check for:
cat .env

# Should contain:
# WEBFLOW_SITE_ID=your-site-id
# WEBFLOW_SITE_API_TOKEN=your-token

# If missing, authenticate:
webflow auth login
```

### Phase 3: Build Process

**Build Command:**
```bash
# Use project's build script
npm run build
# or
yarn build
# or
pnpm build

# Check for errors
echo $?  # 0 = success
```

**Build Validation:**
- Check build output directory exists
- Verify no critical errors
- Confirm assets generated

### Phase 4: Deployment Preview

**Preview Format:**
```
📋 Deployment Preview

Project: [Name or "New Project"]
Framework: [astro/nextjs]
Mount Path: [Path if specified]
Environment: [Name if specified]

[First time: Explain authentication flow]
[Subsequent: Show project ID]

Options:
- Auto-publish: [Yes/No]
- Environment: [Name or default]

⚠️ Type "deploy" to proceed
```

**First-Time Deployment:**
Explain clearly:
1. Browser will open for authentication
2. Select your Webflow site
3. Project ID will be created and saved
4. Future deploys use saved project ID

### Phase 5: Deployment Execution

**Deploy Command:**

IMPORTANT: The Webflow CLI is interactive by default. Always use `--no-input` and `--mount` together to avoid interactive prompts that agents cannot handle.

```bash
# Standard non-interactive deploy (use this by default)
webflow cloud deploy --no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check

# With auto-publish (publishes site after deploy)
webflow cloud deploy --no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check --auto-publish

# New project with name (first deploy)
webflow cloud deploy --no-input \
  --project-name "My App" \
  --mount <MOUNT_PATH> \
  --skip-mount-path-check \
  --skip-update-check

# With specific environment
webflow cloud deploy --no-input \
  -e production \
  --mount <MOUNT_PATH> \
  --skip-mount-path-check \
  --skip-update-check \
  --auto-publish
```

**Deploy Options:**
- `--no-input`: REQUIRED for agents — disables all interactive prompts
- `--mount` / `-m`: REQUIRED — path to mount project. Must match the existing environment's mount path.
- `--skip-mount-path-check`: REQUIRED for agents — skips interactive mount path validation
- `--skip-update-check`: RECOMMENDED — skips interactive package update check
- `--auto-publish`: Publish the site after deployment
- `-e` / `--environment`: Environment name to deploy to
- `--project-name` / `-p`: Project name (for new projects)
- `--directory` / `-d`: Project directory if not in root
- `--description`: Project description (for new projects)

**Success Indicators:**
- Build artifacts uploaded
- Deployment completed
- Project ID saved (first time)
- Site URL available

**Verification:**
1. Check CLI output for success
2. Verify project ID added to webflow.json (first time)
3. Confirm deployment URL works
4. Note if site needs to be published

### Error Handling

**CLI Not Installed:**
```
❌ Webflow CLI Not Found

The Webflow CLI is required for Webflow Cloud.

Installation:
npm install -g @webflow/webflow-cli

After installation, verify:
webflow --version

Documentation: https://developers.webflow.com/cli
```

**Not Authenticated:**
```
❌ Not Authenticated

You must authenticate with Webflow to deploy to Cloud.

Steps:
1. Run: webflow auth login
2. Follow authentication prompts in browser
3. Select your site when prompted
4. Verify: .env file created with WEBFLOW_SITE_ID and WEBFLOW_SITE_API_TOKEN
5. Retry deployment

Need help? https://developers.webflow.com/cli/authentication
```

**Not a Cloud Project:**
```
❌ Not a Webflow Cloud Project

This directory doesn't appear to be a Cloud project.

Initialize Cloud Project:
1. List templates: webflow cloud list
2. Initialize: webflow cloud init -f <framework>
   Example: webflow cloud init -f astro -m /app

Or check webflow.json for cloud configuration:
{
  "cloud": {
    "framework": "astro" or "nextjs"
  }
}
```

**Build Failures:**
```
❌ Build Failed

Error: [Specific error message]

Common Fixes:
- Missing dependencies: Run npm install
- Build script errors: Check package.json build script
- Framework errors: Review framework documentation
- Path issues: Verify file paths and imports

Show build output for details.
```

**Deployment Failures:**
```
❌ Deployment Failed

Error: [Specific error from CLI]

Possible Causes:
- Network connection issues
- Authentication expired
- Build artifacts missing or invalid
- Insufficient permissions

Solutions:
1. Check internet connection
2. Re-authenticate: webflow auth login
3. Rebuild: npm run build
4. Verify webflow.json configuration
5. Check site permissions in Webflow dashboard

Retry deployment? (yes/no)
```

**Invalid Framework:**
```
❌ Invalid Framework

Framework must be either "astro" or "nextjs".

Available templates:
Run: webflow cloud list

Initialize with valid framework:
webflow cloud init -f astro
webflow cloud init -f nextjs
```

### File Operations

**Reading Files:**
Always use Read tool (never modify):
```
# View Cloud configuration
Read: webflow.json

# View package configuration
Read: package.json

# View environment (if exists)
Read: .env

# View build output
Read: dist/ or .next/ or .output/
```

**Discovering Files:**
Use Glob tool to find files:
```
# Find configuration files
Glob: *.json

# Find build output
Glob: dist/**/*

# Find source files
Glob: src/**/*
```

**Never Use Write/Edit Tools:**
- Don't create webflow.json with Write (show user the structure)
- Don't modify configuration files
- Let CLI handle file creation
- Only read files to show content

### Progress Indicators

**For Build:**
```
🔨 Building Application...

Compiling pages... ✓
Optimizing assets... ✓
Generating build... ⏳

Elapsed: 15s
```

**For Deployment:**
```
🚀 Deploying to Webflow Cloud...

Uploading artifacts... ✓
Deploying application... ⏳
Configuring routes... ⏳

Uploaded: 1.2 MB
Elapsed: 25s
```

### Best Practices

**Project Setup:**
- Use `cloud list` to see available templates before init
- Choose framework based on project needs
- Specify mount path during init
- Connect to site ID if already created

**Development:**
- Build locally before deploying
- Test thoroughly in dev environment
- Use environment variables for configuration

**Deployment:**
- Always build before deploying
- Always use `--no-input --mount <MOUNT_PATH> --skip-mount-path-check --skip-update-check` for non-interactive deploys
- Use `--auto-publish` for production deployments
- Test deployment before publishing site

**CI/CD:**
- Store credentials in secrets
- Always use `--no-input` to disable all interactive prompts
- Always specify `--mount` with the correct path
- Enable auto-publish for production
- Use `--skip-mount-path-check` and `--skip-update-check`

**Environment Management:**
- Use .env for local development
- Add .env to .gitignore
- Use CI/CD secrets for production
- Rotate tokens regularly

## Quick Reference

**Workflow:** list templates → init project → build → deploy

**Key Commands:**
- `webflow cloud list` - List available templates
- `webflow cloud init` - Initialize new project
- `webflow cloud deploy` - Deploy application

**Init Options:**
- `-f` / `--framework` - Framework (astro, nextjs)
- `-m` / `--mount` - Mount path
- `-s` / `--site-id` - Site ID

**Deploy Options (for agents/automation, always include first 4):**
- `--no-input` - REQUIRED: disable interactive prompts
- `-m` / `--mount` - REQUIRED: mount path (must match existing environment)
- `--skip-mount-path-check` - REQUIRED: skip mount path validation prompt
- `--skip-update-check` - RECOMMENDED: skip update check prompt
- `--auto-publish` - Publish after deploy
- `-e` / `--environment` - Environment name
- `-p` / `--project-name` - Project name (new projects)

**Configuration:** webflow.json with cloud section

**Schema:**
```json
{
  "cloud": {
    "projectId": "proj_xxx", // auto-set
    "framework": "astro"      // or "nextjs"
  }
}
```

**Authentication:** Site authentication via `webflow auth login`

**Environment:** WEBFLOW_SITE_ID and WEBFLOW_SITE_API_TOKEN in .env

**Verification:** Check `webflow --version` and site authentication first

**Confirmation:** Require "deploy" keyword before deployment

**Documentation:** https://developers.webflow.com/webflow-cloud/intro



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 6/22: component-audit -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:component-audit
description: Audit Webflow Code Components for architecture decisions - prop exposure, state management, slot opportunities, and Shadow DOM compatibility. Focused on Webflow-specific patterns, not generic React best practices.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "2.0"
---

# Component Audit

Audit existing code components for **Webflow-specific architecture decisions**. This skill focuses on how well components integrate with Webflow Designer, not generic React best practices.

## When to Use This Skill

**Use when:**
- User wants to improve how their components work in Webflow Designer
- Reviewing whether the right things are exposed as props vs hardcoded
- Checking if state management patterns are Webflow-compatible
- Looking for opportunities to make components more designer-friendly
- Component isn't rendering or behaving as expected in Webflow

**Do NOT use when:**
- Validating before deployment (use pre-deploy-check instead)
- Creating new components (use component-scaffold instead)
- Converting a React component (use convert-component instead)
- Generic code quality review (use a linter)

## Core Philosophy

This audit answers three questions:

1. **Designer Control**: Are the right things exposed as props for designers to customize?
2. **Webflow Compatibility**: Does the component work within Webflow's constraints (Shadow DOM, SSR, isolated React roots)?
3. **Component Architecture**: Is this the right level of granularity, or should it be split/combined?

## Instructions

### Phase 1: Discovery

1. **Find all components**:
   - Locate webflow.json
   - Find all .webflow.tsx files
   - Read corresponding React components

2. **Understand intent**: Ask user what the components are for and any specific concerns

### Phase 2: Analysis

For each component, analyze these Webflow-specific areas:

#### A. Prop Exposure Analysis

**Goal**: Identify what designers SHOULD be able to control but currently can't.

| Look For | Recommendation |
|----------|----------------|
| Hardcoded text strings | Expose as `props.Text()` |
| Text that designers should edit on canvas | Expose as `props.RichText()` |
| Hardcoded values from a fixed set of options | Expose as `props.Variant({ options: [...] })` |
| Hardcoded image URLs | Expose as `props.Image()` |
| Hardcoded link URLs | Expose as `props.Link()` |
| Hardcoded HTML `id` attributes | Expose as `props.Id()` |
| Conditional rendering with boolean | Expose as `props.Boolean()` or `props.Visibility()` |
| Internal state that affects appearance | Consider exposing initial value as prop |
| `children` not using Slot | Convert to `props.Slot()` |

> **Aliases:** `props.String` = `props.Text`, `props.Children` = `props.Slot`. Treat these as equivalent during audit.

**Questions to ask:**
- "What would a designer want to change?"
- "What requires a code change that shouldn't?"

#### B. State Management Architecture

**Goal**: Identify patterns that won't work in Webflow.

| Anti-Pattern | Why It Fails | Alternative |
|--------------|--------------|-------------|
| React Context for cross-component state | Each component has isolated React root | Use nano stores, custom events, or URL params |
| Prop drilling through Slots | Slot children are separate React apps | Use nano stores or custom events |
| Shared state via module-level variables | May cause SSR issues | Use browser storage or nano stores |
| Global event listeners without cleanup | Memory leaks, SSR issues | Use useEffect with cleanup |

**Refactoring recommendations:**
- If components need to communicate → suggest cross-component state pattern
- If using Context internally only → that's fine, document it
- If components are tightly coupled → suggest decomposition

#### C. Slot Opportunities

**Goal**: Identify hardcoded content that should be designer-controlled.

| Current Pattern | Better Pattern |
|-----------------|----------------|
| Hardcoded button inside card | Slot for actions area |
| Hardcoded icon component | Slot or Image prop |
| Fixed header/footer structure | Slots for header and footer |
| Hardcoded list items | Consider if this should be multiple components |

**When NOT to use Slots:**
- When content has specific behavioral requirements
- When content needs to interact with component state
- When the structure is truly fixed and not customizable

#### D. Shadow DOM Compatibility

**Goal**: Ensure styles work in isolation.

| Issue | Detection | Fix |
|-------|-----------|-----|
| Using site/global CSS classes | Class names like `.container`, `.btn` | Use CSS Modules or component-scoped styles |
| CSS-in-JS not configured | styled-components/Emotion without decorator | Add globals.ts with `styledComponentsShadowDomDecorator` (styled-components) or `emotionShadowDomDecorator` (Emotion/MUI) |
| Missing style imports | Styles defined but not imported in .webflow.tsx | Add import statement |
| Relying on inherited styles | Expecting parent styles to cascade | Use explicit styles or CSS variables |
| Needs tag selectors (h1, p, etc.) | Tags not styled inside Shadow DOM | Enable `applyTagSelectors: true` in component options |

> **SSR Note:** When using styled-components or Emotion, you must also configure the server renderer in `webflow.json` for SSR to work correctly:
> - styled-components: `"library": { "renderer": { "server": "@webflow/styled-components-utils/server" } }`
> - Emotion: `"library": { "renderer": { "server": "@webflow/emotion-utils/server" } }`

#### E. SSR Safety

**Goal**: Identify browser-only code that runs during render.

| Pattern | Problem | Solution |
|---------|---------|----------|
| `window.innerWidth` in render | SSR error | Use useEffect or set `ssr: false` |
| `document.getElementById` in render | SSR error | Use useEffect or refs |
| `localStorage.getItem` outside useEffect | SSR error | Wrap in useEffect with useState |
| Third-party library that requires window | SSR error | Dynamic import or `ssr: false` |

#### F. Component Granularity

**Goal**: Determine if component is at the right level of abstraction.

**Signs a component should be SPLIT:**
- Too many props (>10) making Designer UI cluttered
- Multiple distinct sections that could be independent
- Designers want to use parts separately
- Component handles multiple unrelated concerns

**Signs components should be COMBINED:**
- Always used together
- Tightly coupled state that's awkward to sync
- Small components with no standalone use

### Phase 3: Report

Generate actionable report with:

1. **Summary**: Quick overview of findings
2. **By Component**: Specific issues and recommendations for each
3. **Architecture Recommendations**: Cross-cutting concerns
4. **Priority Actions**: What to fix first

## Audit Checklist

### Designer Control (Most Important for Webflow)

| Check | Question |
|-------|----------|
| Prop completeness | Can designers customize everything they'd want to? |
| Prop types | Are the right Webflow prop types used? |
| Default values | Do props have sensible defaults? |
| Prop naming | Are names clear for non-developers? |
| Slot usage | Is nested content handled via Slots? |
| Visibility props | Can sections be shown/hidden? |

### Webflow Compatibility

| Check | Question |
|-------|----------|
| SSR safe | Does component render without browser APIs? |
| Style isolation | Do styles work in Shadow DOM? |
| State independence | Does component work without Context from parent? |
| No function props | Are there callback props that won't work? |

### Architecture

| Check | Question |
|-------|----------|
| Single responsibility | Does component do one thing well? |
| Right granularity | Is this the right size for Designer use? |
| Cross-component state | If needed, is it implemented correctly? |

## Example

**User prompt:**
```
Audit my ProductCard component
```

**Response:**
```markdown
## Audit: ProductCard

### Component Overview

```typescript
// Current props
props: {
  title: props.Text(),
  price: props.Number(),
  imageUrl: props.Text()  // ⚠️ Should be Image
}
```

---

### A. Prop Exposure Analysis

| Finding | Severity | Recommendation |
|---------|----------|----------------|
| `imageUrl` is Text, not Image | Warning | Change to `props.Image()` for proper asset handling |
| "Add to Cart" button text is hardcoded | Suggestion | Expose as prop: `addToCartText: props.Text()` |
| Sale badge is conditionally rendered but not controllable | Suggestion | Add `showSaleBadge: props.Boolean()` |
| Badge color is hardcoded red | Suggestion | Add `badgeVariant: props.Variant({ options: ["sale", "new", "featured"] })` |

**Hardcoded Content Found:**
```typescript
// Line 24 - hardcoded, should be prop
<button>Add to Cart</button>

// Line 18 - hardcoded, should be prop or removed
{onSale && <span className="badge">SALE</span>}
```

**Recommended Props to Add:**
```typescript
props: {
  // ...existing
  addToCartLabel: props.Text({
    name: "Button Label",
    defaultValue: "Add to Cart"
  }),
  showBadge: props.Boolean({
    name: "Show Badge",
    defaultValue: false
  }),
  badgeType: props.Variant({
    name: "Badge Type",
    options: ["sale", "new", "featured"],
    defaultValue: "sale"
  })
}
```

---

### B. State Management

| Finding | Severity |
|---------|----------|
| Uses `localStorage` for cart count | Warning |
| No React Context dependencies | OK |

**Issue: localStorage in render**
```typescript
// Line 8 - will break SSR
const cartCount = localStorage.getItem('cart');
```

**Fix:**
```typescript
const [cartCount, setCartCount] = useState(0);
useEffect(() => {
  setCartCount(parseInt(localStorage.getItem('cart') || '0'));
}, []);
```

---

### C. Slot Opportunities

| Current | Recommendation |
|---------|----------------|
| Hardcoded button | Consider: `actions: props.Slot()` for flexible CTAs |

If designers need to put different content (button, link, custom element) in the action area:
```typescript
props: {
  actions: props.Slot({
    name: "Actions"
  })
}

// Component
<div className={styles.actions}>
  {actions}
</div>
```

**However**, if button behavior is tied to cart logic, keep it hardcoded.

---

### D. Shadow DOM Compatibility

| Check | Status |
|-------|--------|
| Styles imported in .webflow.tsx | ✅ OK |
| CSS Modules used | ✅ OK |
| No global class references | ✅ OK |

---

### E. SSR Safety

| Check | Status |
|-------|--------|
| window usage | ✅ None |
| document usage | ✅ None |
| localStorage usage | ⚠️ Needs guard (see fix above) |

---

### F. Component Granularity

**Current size**: 4 props (will be 7 after recommendations)
**Verdict**: Good granularity - single purpose, manageable props

---

## Summary

| Category | Status |
|----------|--------|
| Designer Control | ⚠️ Needs work - 4 hardcoded items found |
| State Management | ⚠️ localStorage needs SSR guard |
| Shadow DOM | ✅ Good |
| SSR Safety | ⚠️ One issue |
| Granularity | ✅ Good |

**Priority Actions:**
1. Fix localStorage SSR issue (blocks deployment)
2. Change imageUrl from Text to Image prop
3. Expose badge controls as props
4. Consider exposing button label
```

## Guidelines

### What This Audit Does NOT Check

This is not a generic code quality audit. Skip:
- Generic React performance patterns (let users use React DevTools)
- Generic accessibility (let users use axe or similar)
- Code formatting (let users use Prettier/ESLint)
- Generic TypeScript best practices

Focus only on Webflow-specific concerns.

### Prop Exposure Heuristics

**Should be a prop:**
- Any text visible in the UI
- Any image or media
- Any color or size that might vary
- Any boolean that controls visibility
- Any value that changes per-use

**Should NOT be a prop:**
- Internal implementation details
- State that changes during interaction
- Values derived from other props
- Animation timing/easing (unless explicitly customizable)

### When to Recommend Slots vs Props

**Use Slot when:**
- Designer wants to put arbitrary Webflow elements inside
- Content structure is flexible
- Nested content doesn't need to interact with component state

**Use Props when:**
- Content is simple (text, image, link)
- Component needs to process/transform the content
- Specific structure is required

### State Pattern Recommendations

If components need to share state, recommend in this order:
1. **URL parameters** - if state should be shareable/bookmarkable
2. **Nano stores** - for real-time sync between components
3. **Custom events** - for fire-and-forget communication
4. **Browser storage** - for persistence across sessions



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 7/22: component-scaffold -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:component-scaffold
description: Generate new Webflow Code Component boilerplate with React component, definition file, and optional styling. Automatically checks prerequisites and can set up missing config/dependencies.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "1.0"
---

# Component Scaffold

Generate a new Webflow Code Component with proper file structure, React component, and `.webflow.tsx` definition file.

## When to Use This Skill

**Use when:**
- Creating a new code component from scratch
- User asks to scaffold, generate, or create a component
- Starting a new component with proper Webflow file structure

**Do NOT use when:**
- Converting an existing React component (use convert-component skill)
- Modifying existing components (answer directly or use component-audit)
- Just asking questions about components (answer directly)
- Setting up a complex project with custom bundler config (use local-dev-setup instead)

**Note:** This skill can handle basic setup (webflow.json + dependencies) automatically. Use local-dev-setup only for complex setups requiring Tailwind, custom webpack config, or monorepo configurations.

## Instructions

### Phase 0: Prerequisites Check (Run First)

Before gathering any requirements, verify the project is set up for Webflow Code Components:

1. **Check for webflow.json**:
   ```bash
   # Look for webflow.json in project root
   ```
   - If missing: Offer to create it or invoke local-dev-setup skill

2. **Check for required dependencies** in package.json:
   ```json
   {
     "devDependencies": {
       "@webflow/webflow-cli": "...",
       "@webflow/data-types": "...",
       "@webflow/react": "..."
     }
   }
   ```
   - If missing: Offer to install them:
     ```bash
     npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
     ```

3. **Check for components directory**:
   - Look for existing pattern (e.g., `src/components/`)
   - If no components exist, determine where to create them based on webflow.json config

4. **Report setup status**:

   **If all prerequisites met:**
   ```
   ✅ Project ready for code components
   - webflow.json: Found
   - Dependencies: Installed
   - Components path: src/components/

   Let's create your component...
   ```

   **If prerequisites missing:**
   ```
   ⚠️ Project Setup Required

   Missing:
   - [ ] webflow.json configuration file
   - [ ] @webflow/webflow-cli dependency
   - [ ] @webflow/data-types dependency
   - [ ] @webflow/react dependency

   Would you like me to:
   1. Set up the missing items now (quick setup)
   2. Run full project initialization (local-dev-setup skill)

   Choose an option:
   ```

   **Quick setup** creates minimal config:
   ```json
   // webflow.json
   {
     "library": {
       "name": "My Component Library",
       "components": ["./src/components/**/*.webflow.tsx"]
     }
   }
   ```
   And installs dependencies.

   **Optional:** `webflow.json` also supports a `"globals"` field pointing to a globals file (e.g., `"globals": "./src/globals.webflow.ts"`). The globals file is used for global CSS imports (e.g., Tailwind) and exporting decorator arrays. Add this when using styled-components, Emotion, or Tailwind.

**Only proceed to Phase 1 after prerequisites are confirmed.**

---

### Phase 1: Gather Requirements

1. **Get component name**: Ask user for the component name
   - Must be PascalCase (e.g., "Accordion", "ProductCard")
   - Suggest name if user provides description instead

2. **Determine component type**: Ask what kind of component
   - Interactive (buttons, forms, accordions)
   - Display (cards, banners, testimonials)
   - Layout (grids, containers, sections)
   - Data-driven (lists, tables, charts)

3. **Identify props needed**: Based on component type, suggest props
   - Text content → `props.Text()` or `props.RichText()`
   - Canvas-editable text → `props.TextNode()`
   - Images → `props.Image()`
   - Links → `props.Link()`
   - Numeric values → `props.Number()`
   - Variants/styles → `props.Variant()`
   - Nested content → `props.Slot()`
   - Toggles → `props.Boolean()`
   - Show/hide sections → `props.Visibility()`
   - HTML element IDs → `props.Id()`

4. **Styling approach**: Ask preferred styling method
   - CSS Modules (default, recommended)
   - Tailwind CSS
   - styled-components
   - Emotion
   - Sass / Less
   - Plain CSS
   - Other supported: MUI (uses Emotion), Shadcn/UI (uses Tailwind)

5. **SSR requirements**: Determine if component needs client-only features
   - Uses browser APIs? → `ssr: false`
   - Pure presentation? → `ssr: true` (default)

### Phase 2: Validate Project Setup

6. **Check project structure**:
   - Verify `webflow.json` exists
   - Check for required dependencies
   - Identify components directory pattern

7. **Check for conflicts**:
   - Ensure component name doesn't already exist
   - Verify no `.webflow.tsx` file with same name

### Phase 3: Generate Files

8. **Create directory structure**:
```
src/components/[ComponentName]/
├── [ComponentName].tsx
├── [ComponentName].webflow.tsx
└── [ComponentName].module.css (if CSS Modules)
```

9. **Generate React component** (`[ComponentName].tsx`):
```typescript
import React from "react";
import styles from "./[ComponentName].module.css";

export interface [ComponentName]Props {
  // Props interface based on user requirements
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  // Destructured props with defaults
}) => {
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
};
```

10. **Generate definition file** (`[ComponentName].webflow.tsx`):
```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { [ComponentName] } from "./[ComponentName]";
import "./[ComponentName].module.css";

export default declareComponent([ComponentName], {
  name: "[ComponentName]",
  description: "[User-provided or generated description]",
  group: "[Category]",
  props: {
    // Props configuration based on requirements
  },
  options: {
    applyTagSelectors: true,
    ssr: true // or false based on requirements
  }
});
```

**Note on decorators:** `declareComponent` also accepts an optional `decorators` array for wrapping components with providers. Built-in decorators include `styledComponentsShadowDomDecorator` (for styled-components) and `emotionShadowDomDecorator` (for Emotion). Global decorators can be exported from a globals file referenced in `webflow.json` — see the globals file note below.

11. **Generate styles** (if CSS Modules):
```css
.container {
  /* Base styles */
}
```

### Phase 4: Provide Guidance

12. **Show created files**: List all files created with paths

13. **Explain next steps**:
    - Implement component logic
    - Add styling
    - Test locally by running the React project (e.g., `npm run dev`)
    - Deploy to Webflow with `npx webflow library share`

14. **Shadow DOM awareness**:
```
Note: Code components run inside Shadow DOM. Site-level CSS classes won't work
inside your component. Use component-scoped styles (CSS Modules, etc.).
Site CSS variables DO work — use var(--variable-name, fallback).
```

15. **Warn about naming**:
```
⚠️ Important: Do not rename the .webflow.tsx file after deployment.
Renaming creates a new component and breaks existing instances.
```

## Examples

**User prompt:**
```
Create an accordion component
```

**Step 1: Requirements Gathering**
```
📦 New Component: Accordion

I'll create an accordion component. Let me confirm the requirements:

**Props to include:**
1. `title` (Text) - The accordion header text
2. `content` (Rich Text) - The expandable content
3. `defaultOpen` (Boolean) - Whether to start expanded
4. `icon` (Variant) - Chevron style: "arrow" | "plus" | "none"

**Styling:** CSS Modules (recommended for Shadow DOM)

**SSR:** Enabled (no browser-only APIs needed)

Does this look right? Any props to add or remove?
```

**Step 2: After User Confirms**
```
📁 Creating Component Files...

Created:
├── src/components/Accordion/Accordion.tsx
├── src/components/Accordion/Accordion.webflow.tsx
└── src/components/Accordion/Accordion.module.css

✅ Component scaffold complete!

---

**Accordion.tsx** - React component with:
- Props: title, content, defaultOpen, icon
- State management for open/closed
- Accessible keyboard navigation
- CSS Module classes

**Accordion.webflow.tsx** - Webflow definition with:
- All props configured for Designer editing
- Default values set
- SSR enabled

---

💡 Next Steps:
1. Review and customize the generated code
2. Test locally by running your React project (e.g., `npm run dev`)
3. Deploy to Webflow: `npx webflow library share`

⚠️ Remember: Don't rename .webflow.tsx files after deployment!
```

**Generated Accordion.tsx:**
```typescript
import React, { useState } from "react";
import styles from "./Accordion.module.css";

export interface AccordionProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
  icon?: "arrow" | "plus" | "none";
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  defaultOpen = false,
  icon = "arrow"
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        {icon !== "none" && (
          <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>
            {icon === "arrow" ? "▼" : "+"}
          </span>
        )}
      </button>
      {isOpen && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};
```

**Generated Accordion.webflow.tsx:**
```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Accordion } from "./Accordion";
import "./Accordion.module.css";

export default declareComponent(Accordion, {
  name: "Accordion",
  description: "Expandable content section with customizable header and icon",
  group: "Interactive",
  props: {
    title: props.Text({
      name: "Title",
      defaultValue: "Accordion Title"
    }),
    content: props.RichText({
      name: "Content",
      defaultValue: "<p>Accordion content goes here.</p>"
    }),
    defaultOpen: props.Boolean({
      name: "Start Expanded",
      defaultValue: false
    }),
    icon: props.Variant({
      name: "Icon Style",
      options: ["arrow", "plus", "none"],
      defaultValue: "arrow"
    })
  },
  options: {
    applyTagSelectors: true,
    ssr: true
  }
});
```

## Guidelines

### Prop Type Selection

| User Wants | Prop Type | Notes |
|------------|-----------|-------|
| Editable text | `props.Text()` | Single line, max 256 chars |
| Long formatted text | `props.RichText()` | HTML content |
| Canvas-editable text | `props.TextNode()` | Double-click to edit |
| Image upload | `props.Image()` | Returns image object |
| URL/link | `props.Link()` | Returns { href, target, preload } |
| Number input | `props.Number()` | Numeric values |
| Toggle/flag | `props.Boolean()` | true/false |
| Style options | `props.Variant()` | Dropdown selection |
| Nested content | `props.Slot()` | Other components inside |
| HTML ID | `props.Id()` | For accessibility |

### Component Categories (Groups)

- **Interactive**: Buttons, forms, accordions, tabs, modals
- **Display**: Cards, banners, testimonials, badges
- **Layout**: Grids, containers, sections, dividers
- **Navigation**: Menus, breadcrumbs, pagination
- **Media**: Galleries, video players, carousels
- **Data**: Tables, lists, charts, counters

### SSR Decision Tree

```
Set ssr: false if ANY of these apply:

1. Browser APIs — Uses window, document, localStorage, or similar
2. Dynamic/personalized content — User-specific dashboards, authenticated views, client data
3. Heavy/interactive UI — Charts, 3D scenes, maps, animation-driven elements
4. Non-deterministic output — Random numbers, time-based values, anything that renders differently server vs client

Otherwise → Keep ssr: true (default)
```

### File Naming Rules

- Component name: PascalCase (`ProductCard`)
- Files use same name: `ProductCard.tsx`, `ProductCard.webflow.tsx`
- CSS modules: `ProductCard.module.css`
- Directory: `src/components/ProductCard/`

### Default Values Best Practice

Always provide meaningful defaults:
```typescript
props: {
  title: props.Text({
    name: "Title",
    defaultValue: "Card Title"  // ✅ Good
  }),
  count: props.Number({
    name: "Count",
    defaultValue: 0  // ✅ Good
  })
}
```

Not:
```typescript
props: {
  title: props.Text({
    name: "Title"
    // ❌ Missing defaultValue
  })
}
```

## Error Handling

**Component name already exists:**
```
⚠️ Component "Button" already exists at src/components/Button/

Options:
1. Choose a different name
2. Update existing component (use component-audit skill)
3. Delete existing and create new

Which would you like to do?
```

**Missing webflow.json:**
```
❌ No webflow.json found in project root

This file is required for code components. Would you like me to:
1. Create a basic webflow.json
2. Run local-dev-setup skill for full project initialization

Choose an option (1/2):
```

**Invalid component name:**
```
⚠️ Invalid component name: "my-button"

Component names must be:
- PascalCase (e.g., "MyButton")
- Start with a letter
- Contain only letters and numbers

Suggested name: "MyButton"

Use this name? (yes/no)
```



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 8/22: convert-component -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:convert-component
description: Convert an existing React component into a Webflow Code Component. Analyzes TypeScript props, maps to Webflow prop types, generates the .webflow.tsx definition file, and identifies required modifications.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "1.0"
---

# Convert Component

Convert an existing React component into a Webflow Code Component by analyzing its structure and generating the appropriate `.webflow.tsx` definition file.

## When to Use This Skill

**Use when:**
- User has an existing React component they want to use in Webflow
- User asks to "convert", "adapt", or "make this work with Webflow"
- User provides a React component file and wants a Webflow definition
- User is migrating components from another React project

**Do NOT use when:**
- Creating a component from scratch (use component-scaffold)
- User just wants to understand code components (answer directly)
- Component is already a Webflow code component (use component-audit)

## Instructions

### Phase 1: Analyze Existing Component

1. **Read the React component file**: Get the full source code

2. **Extract component information**:
   - Component name (function/const name)
   - Props interface or type definition
   - Each prop's TypeScript type
   - Default values if defined
   - Whether component uses `children`

3. **Identify incompatible patterns**:

   | Pattern | Issue | Resolution |
   |---------|-------|------------|
   | React Context usage | Context doesn't work across Webflow components | Refactor to props or use nano stores |
   | `window`/`document` in render | SSR will fail | Wrap in useEffect or set `ssr: false` |
   | `localStorage`/`sessionStorage` in render | SSR will fail | Wrap in useEffect or set `ssr: false` |
   | Complex object props | Can't map to Webflow prop types | Break into individual props |
   | Function props (callbacks) | Not supported in Webflow | Remove or internalize logic |
   | `useContext` hook | Won't work across components | Use alternative state patterns |
   | External CSS imports | May not work in Shadow DOM | Import in .webflow.tsx instead |
   | CSS class references to global styles | Won't work in Shadow DOM | Use component-scoped styles |
   | styled-components | Needs Shadow DOM decorator | Set up globals.ts with decorator |
   | Emotion (@emotion/styled) | Needs Shadow DOM decorator | Set up globals.ts with decorator |

4. **Detect styling approach** and note required setup:

   **If using styled-components:**
   ```bash
   npm i @webflow/styled-components-utils styled-components
   ```

   Create/update `globals.ts`:
   ```typescript
   import { styledComponentsShadowDomDecorator } from "@webflow/styled-components-utils";
   export const decorators = [styledComponentsShadowDomDecorator];
   ```

   **If using Emotion:**
   ```bash
   npm i @webflow/emotion-utils @emotion/cache @emotion/react
   ```

   Create/update `globals.ts`:
   ```typescript
   import { emotionShadowDomDecorator } from "@webflow/emotion-utils";
   export const decorators = [emotionShadowDomDecorator];
   ```

   **For both CSS-in-JS approaches**, update `webflow.json`:

   styled-components:
   ```json
   {
     "library": {
       "globals": "./src/globals.ts",
       "renderer": {
         "server": "@webflow/styled-components-utils/server"
       }
     }
   }
   ```

   Emotion:
   ```json
   {
     "library": {
       "globals": "./src/globals.ts",
       "renderer": {
         "server": "@webflow/emotion-utils/server"
       }
     }
   }
   ```

5. **Flag any dependencies** that might cause issues:
   - Large libraries (bundle size concern)
   - Browser-only libraries
   - Libraries that manipulate DOM directly

### Phase 2: Map Props to Webflow Types

6. **Apply TypeScript → Webflow prop type mapping**:

   | TypeScript Type | Webflow Prop | Notes |
   |-----------------|--------------|-------|
   | `string` | `props.Text()` | Default for short text |
   | `string` (long/HTML content) | `props.RichText()` | If prop name suggests content/body/description |
   | `React.ReactNode` / `children` | `props.Slot()` | For nested content |
   | `number` | `props.Number()` | Numeric values |
   | `boolean` | `props.Boolean()` | Toggles |
   | `"option1" \| "option2"` | `props.Variant()` | String literal unions (requires `options` array) |
   | `enum` | `props.Variant()` | Convert enum values to `options` array (required) |
   | `{ href: string; ... }` | `props.Link()` | Returns `{ href, target?, preload? }` object — may need wrapper if component expects separate `href`/`target` props |
   | Image-related types | `props.Image()` | Image src, url, etc. |
   | `string` (canvas-editable text) | `props.TextNode()` | For text editable directly on canvas; has `multiline` param |
   | `boolean` (show/hide) | `props.Visibility()` | Semantic show/hide toggle |
   | `string` (for HTML id) | `props.Id()` | If prop is named "id" or used for accessibility |
   | Complex objects | **SPLIT** | Break into multiple simple props |
   | Functions/callbacks | **REMOVE** | Not supported |
   | Arrays | **SPECIAL** | May need component redesign |

7. **Handle special cases**:

   **Complex object props** - Break them down:
   ```typescript
   // Original
   interface Props {
     author: {
       name: string;
       avatar: string;
       bio: string;
     }
   }

   // Converted to flat props
   props: {
     authorName: props.Text({ name: "Author Name" }),
     authorAvatar: props.Image({ name: "Author Avatar" }),
     authorBio: props.RichText({ name: "Author Bio" })
   }
   ```

   **Union types with more than simple strings**:
   ```typescript
   // Original - complex union
   type Size = "sm" | "md" | "lg" | { width: number; height: number };

   // Convert to Variant with only string options
   size: props.Variant({
     name: "Size",
     options: ["sm", "md", "lg", "custom"],
     defaultValue: "md"
   })
   // Note: Custom size would need additional Number props
   ```

   **Optional props** - Provide defaultValue for prop types that support it. Note: Link, Image, Slot, and Id do not accept defaultValue.
   ```typescript
   // Original
   interface Props {
     title?: string;
   }

   // Converted - provide default for types that support it
   title: props.Text({
     name: "Title",
     defaultValue: ""  // Empty string or sensible default
   })
   ```

### Phase 3: Check Project Setup

8. **Verify Webflow setup exists**:
   - Check for `webflow.json` in project root
   - Check for required dependencies (@webflow/webflow-cli, @webflow/data-types, @webflow/react)
   - If using styled-components/Emotion, check for decorator packages
   - If missing, offer to set up or direct to local-dev-setup skill

9. **Determine file locations**:
   - Identify where the original component lives
   - Determine where `.webflow.tsx` should be created (same directory)
   - Check for existing styles that need to be imported

### Phase 4: Generate Definition File

10. **Create the `.webflow.tsx` file**:

```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { ComponentName } from "./ComponentName";
// Import styles if they exist
import "./ComponentName.module.css"; // or .css

export default declareComponent(ComponentName, {
  name: "ComponentName",
  description: "[Generated from component purpose]",
  group: "[Appropriate category]",
  props: {
    // Mapped props here
  },
  // decorators: [], // Optional — per-component decorators (e.g., for CSS-in-JS Shadow DOM support)
  options: {
    applyTagSelectors: true, // Default is false. Set to true to apply Webflow's tag selectors (e.g., h1, p styles) inside the component.
    ssr: true // or false if browser APIs detected
  }
});
```

11. **Provide the complete file** with all props mapped

### Phase 5: Document Required Changes

12. **List modifications needed** to the original component:

```markdown
## Required Changes to [ComponentName].tsx

### Must Fix (Component won't work without these):
- [ ] Issue 1: [Description and how to fix]
- [ ] Issue 2: [Description and how to fix]

### Recommended (Will improve Webflow integration):
- [ ] Recommendation 1
- [ ] Recommendation 2

### Props Mapping Summary:
| Original Prop | Webflow Prop | Notes |
|---------------|--------------|-------|
| title: string | props.Text() | Direct mapping |
| isOpen: boolean | props.Boolean() | Direct mapping |
| data: object | SPLIT → dataTitle, dataValue | Flattened |
| onClick: function | REMOVED | Not supported |
```

13. **Provide modified component code** if changes are needed:
    - Show the updated TypeScript interface
    - Show any useEffect wrappers needed for SSR
    - Show style import changes
    - Note CSS-in-JS setup requirements if applicable

## Examples

### Example 1: Simple Component Conversion

**User prompt:**
```
Convert this React component to work with Webflow:

// TestimonialCard.tsx
interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle?: string;
  rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorTitle = "",
  rating = 5
}) => {
  return (
    <div className="testimonial-card">
      <div className="stars">{"★".repeat(rating)}</div>
      <blockquote>{quote}</blockquote>
      <div className="author">
        <strong>{authorName}</strong>
        {authorTitle && <span>{authorTitle}</span>}
      </div>
    </div>
  );
};
```

**Response:**

```markdown
## Component Analysis: TestimonialCard

### Props Detected:
| Prop | TypeScript Type | Webflow Mapping |
|------|-----------------|-----------------|
| quote | string | props.Text() |
| authorName | string | props.Text() |
| authorTitle | string (optional) | props.Text() |
| rating | number (optional) | props.Number() |

### Issues Found:
- **CSS class "testimonial-card"** - Uses global class that won't work in Shadow DOM
  - Fix: Convert to CSS Modules or import scoped styles

### No blocking issues - ready to convert!

---

## Generated Files

### TestimonialCard.webflow.tsx
```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { TestimonialCard } from "./TestimonialCard";
import "./TestimonialCard.module.css";

export default declareComponent(TestimonialCard, {
  name: "TestimonialCard",
  description: "Display customer testimonials with rating stars",
  group: "Display",
  props: {
    quote: props.Text({
      name: "Quote",
      defaultValue: "This product changed my life!"
    }),
    authorName: props.Text({
      name: "Author Name",
      defaultValue: "Jane Doe"
    }),
    authorTitle: props.Text({
      name: "Author Title",
      defaultValue: "CEO, Company"
    }),
    rating: props.Number({
      name: "Rating",
      defaultValue: 5,
      min: 1,
      max: 5
    })
  },
  options: {
    applyTagSelectors: true,
    ssr: true
  }
});
```

### Required Changes to TestimonialCard.tsx

1. **Convert to CSS Modules** - Rename `TestimonialCard.css` to `TestimonialCard.module.css` and update imports:

```typescript
import styles from "./TestimonialCard.module.css";

// Default CSS Modules uses bracket notation:
<div className={styles["testimonial-card"]}>
<div className={styles["stars"]}>
// Dot notation (styles.testimonialCard) requires camelCase class names
// or a webpack override for css-loader.
```

### Setup Check
- [ ] Verify webflow.json exists
- [ ] Install dependencies if needed: `npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react`
```

---

### Example 2: Component with Incompatible Patterns

**User prompt:**
```
Make this work as a Webflow code component:

// Modal.tsx
import { createContext, useContext, useState } from 'react';

const ModalContext = createContext<{ isOpen: boolean; toggle: () => void } | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ trigger, children, onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState && onOpen) onOpen();
    if (!newState && onClose) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, toggle }}>
      <div onClick={toggle}>{trigger}</div>
      {isOpen && (
        <div className="modal-overlay" onClick={toggle}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
```

**Response:**

```markdown
## Component Analysis: Modal

### Issues Found:

| Issue | Severity | Resolution |
|-------|----------|------------|
| React Context (ModalContext) | Critical | Context won't work across Webflow components. Since this is internal to Modal, it's OK but exported useModal hook won't work. |
| document.body manipulation | Critical | SSR incompatible. Must set `ssr: false` or wrap in useEffect check. |
| onOpen/onClose callbacks | Warning | Function props not supported in Webflow. Must remove. |
| Global CSS classes | Warning | "modal-overlay", "modal-content" won't work in Shadow DOM. |

### Props Detected:
| Prop | TypeScript Type | Webflow Mapping | Status |
|------|-----------------|-----------------|--------|
| trigger | React.ReactNode | props.Slot() | OK |
| children | React.ReactNode | props.Slot() | OK |
| onOpen | function | REMOVE | Not supported |
| onClose | function | REMOVE | Not supported |

---

## Required Changes

### 1. Remove function props (onOpen, onClose)
These cannot be passed from Webflow Designer. Remove from interface and component.

### 2. Fix SSR issue with document.body
Either set `ssr: false` or add typeof check:

```typescript
useEffect(() => {
  if (typeof document === 'undefined') return;
  // ... rest of effect
}, [isOpen]);
```

### 3. Convert to CSS Modules
Rename styles and update class references.

### 4. Remove exported useModal hook
This won't work for external components. Keep ModalContext internal only.

---

## Generated Files

### Modal.webflow.tsx
```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Modal } from "./Modal";
import "./Modal.module.css";

export default declareComponent(Modal, {
  name: "Modal",
  description: "Overlay modal dialog with trigger element",
  group: "Interactive",
  props: {
    trigger: props.Slot({
      name: "Trigger"
    }),
    children: props.Slot({
      name: "Content"
    })
  },
  options: {
    applyTagSelectors: true,
    ssr: false  // Required due to document.body usage
  }
});
```

### Updated Modal.tsx
```typescript
import { useState, useEffect } from 'react';
import styles from "./Modal.module.css";

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  // Removed: onOpen, onClose - not supported in Webflow
}

export const Modal: React.FC<ModalProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div onClick={toggle}>{trigger}</div>
      {isOpen && (
        <div className={styles["overlay"]} onClick={toggle}>
          <div className={styles["content"]} onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
```

### Setup Required
```bash
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```
```

---

### Example 3: Component with Complex Object Props

**User prompt:**
```
Convert to Webflow:

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'electronics' | 'clothing' | 'home';
}

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export const ProductCard = ({ product, showBadge = true }: ProductCardProps) => (
  <div>
    <img src={product.image} alt={product.name} />
    {showBadge && <span>{product.category}</span>}
    <h3>{product.name}</h3>
    <p>${product.price}</p>
  </div>
);
```

**Response:**

```markdown
## Component Analysis: ProductCard

### Complex Props Detected:

The `product` prop is a complex object that must be flattened for Webflow:

| Original | Flattened Props |
|----------|-----------------|
| product.id | (Not needed in UI - remove) |
| product.name | productName: props.Text() |
| product.price | productPrice: props.Number() |
| product.image | productImage: props.Image() |
| product.category | productCategory: props.Variant() |
| showBadge | showBadge: props.Boolean() |

---

## Generated Files

### ProductCard.webflow.tsx
```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { ProductCard } from "./ProductCard";
import "./ProductCard.module.css";

export default declareComponent(ProductCard, {
  name: "ProductCard",
  description: "Product display card with image, name, price, and category",
  group: "Display",
  props: {
    productName: props.Text({
      name: "Product Name",
      defaultValue: "Product Title"
    }),
    productPrice: props.Number({
      name: "Price",
      defaultValue: 29.99
    }),
    productImage: props.Image({
      name: "Product Image"
    }),
    productCategory: props.Variant({
      name: "Category",
      options: ["electronics", "clothing", "home"],
      defaultValue: "electronics"
    }),
    showBadge: props.Boolean({
      name: "Show Category Badge",
      defaultValue: true
    })
  },
  options: {
    applyTagSelectors: true,
    ssr: true
  }
});
```

### Updated ProductCard.tsx
```typescript
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage?: { src: string; alt?: string };
  productCategory: 'electronics' | 'clothing' | 'home';
  showBadge?: boolean;
}

export const ProductCard = ({
  productName,
  productPrice,
  productImage,
  productCategory,
  showBadge = true
}: ProductCardProps) => (
  <div className={styles["card"]}>
    {productImage && (
      <img src={productImage.src} alt={productImage.alt || productName} />
    )}
    {showBadge && <span className={styles["badge"]}>{productCategory}</span>}
    <h3>{productName}</h3>
    <p>${productPrice.toFixed(2)}</p>
  </div>
);
```

### Migration Notes:
- The `product` object has been flattened into individual props
- Each prop is now directly editable in Webflow Designer
- `product.id` was removed as it's not displayed in the UI
- Image prop now uses Webflow's Image type (provides { src, alt })
```

---

### Example 4: Component with styled-components

**User prompt:**
```
Convert this styled-components React component to Webflow:

// Button.tsx
import styled from 'styled-components';

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  background: ${props => props.variant === 'primary' ? '#3b82f6' : '#e5e7eb'};
  color: ${props => props.variant === 'primary' ? 'white' : '#1f2937'};

  &:hover {
    opacity: 0.9;
  }
`;

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({ label, variant = 'primary', disabled = false }: ButtonProps) => (
  <StyledButton variant={variant} disabled={disabled}>
    {label}
  </StyledButton>
);
```

**Response:**

```markdown
## Component Analysis: Button

### Styling Approach Detected: styled-components

styled-components requires a Shadow DOM decorator to work in Webflow.

### Props Detected:
| Prop | TypeScript Type | Webflow Mapping |
|------|-----------------|-----------------|
| label | string | props.Text() |
| variant | 'primary' \| 'secondary' | props.Variant() |
| disabled | boolean | props.Boolean() |

### No blocking issues - ready to convert!

---

## Required Setup for styled-components

**1. Install dependencies:**
```bash
npm i @webflow/styled-components-utils styled-components
npm i -D @types/styled-components
```

**2. Create/update `src/globals.ts`:**
```typescript
import { styledComponentsShadowDomDecorator } from "@webflow/styled-components-utils";
export const decorators = [styledComponentsShadowDomDecorator];
```

**3. Update `webflow.json`:**
```json
{
  "library": {
    "name": "My Library",
    "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
    "globals": "./src/globals.ts"
  }
}
```

---

## Generated Files

### Button.webflow.tsx
```typescript
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { Button } from "./Button";
// No CSS import needed - styled-components handles styles

export default declareComponent(Button, {
  name: "Button",
  description: "Styled button with primary and secondary variants",
  group: "Interactive",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Click me"
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["primary", "secondary"],
      defaultValue: "primary"
    }),
    disabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      trueLabel: "Disabled",
      falseLabel: "Enabled"
    })
  },
  options: {
    applyTagSelectors: true,
    ssr: true
  }
});
```

### No changes needed to Button.tsx
The component can remain as-is. The styled-components decorator in globals.ts will handle Shadow DOM style injection automatically.

### Setup Checklist
- [ ] Install @webflow/styled-components-utils
- [ ] Create globals.ts with decorator
- [ ] Update webflow.json to reference globals
- [ ] Deploy with `npx webflow library share`
```

## Guidelines

### When to Recommend Component Redesign

Some components fundamentally don't fit the Webflow model:

1. **Heavy Context usage**: If component relies on app-wide context, suggest redesign
2. **Complex state machines**: May need simplification
3. **Tightly coupled components**: Each needs to be independent in Webflow
4. **Components that render portals**: Consider if portal is necessary

### Default Value Strategy

Always provide sensible defaults:
- Text props: Representative example text
- Numbers: Common/typical value
- Booleans: Most common use case
- Variants: Most popular option
- Images: Can be undefined (optional)
- Slots: No default needed

### Props Naming for Webflow

Make prop names designer-friendly:
- Use descriptive names: `buttonText` not `txt`
- Avoid abbreviations: `imageSource` not `imgSrc`
- Group related props with prefixes: `authorName`, `authorAvatar`, `authorBio`

### SSR Decision

Set `ssr: false` if component:
- Accesses `window`, `document`, `navigator`
- Uses `localStorage` or `sessionStorage`
- Manipulates DOM directly
- Uses libraries that require browser APIs
- Renders canvas, WebGL, or maps



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 9/22: deploy-guide -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:deploy-guide
description: Step-by-step guide for deploying Webflow Code Components to a workspace. Covers authentication, pre-flight checks, deployment execution, and verification.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "1.1"
---

# Deploy Guide

Guide users through deploying their code component library to Webflow.

## When to Use This Skill

**Use when:**
- User is ready to deploy components to Webflow
- User asks how to share, publish, or deploy their library
- First-time deployment to a workspace
- Step-by-step deployment walkthrough needed

**Do NOT use when:**
- Deployment failed (use troubleshoot-deploy instead)
- Just validating before deploy (use pre-deploy-check instead)
- Setting up local development (use local-dev-setup instead)

**Note:** The CLI command is `webflow library share`. This skill uses "deploy" as the user-facing term.

## Instructions

### Phase 1: Pre-Flight Checks

1. **Verify project is ready**:
   - Check webflow.json configuration
   - Ensure all dependencies installed
   - Run pre-deploy-check skill checks

2. **Check authentication status**:
   - Look for existing .env with API token
   - Verify WEBFLOW_WORKSPACE_API_TOKEN if set
   - Prepare for authentication if needed

3. **Confirm deployment target**:
   - Which workspace?
   - New library or update existing?

### Phase 2: Authentication

4. **Guide authentication**:
   - Interactive: Follow CLI prompts
   - CI/CD: Use --api-token flag
   - Show how to get workspace API token if needed

### Phase 3: Deployment

5. **Execute deployment**:
   - Run `npx webflow library share`
   - Monitor for errors
   - Capture output

### Phase 4: Verification

6. **Verify deployment**:
   - Check Webflow Designer for components
   - Test component functionality
   - Confirm all components appear

7. **Provide next steps**:
   - How to use components in Designer
   - How to update in future
   - Common post-deploy tasks
   - If deployment fails, use [troubleshoot-deploy](../troubleshoot-deploy/SKILL.md) to diagnose and fix issues

## Deployment Workflow

### Standard Deployment

```
📦 Deploying Code Components

Step 1: Pre-flight checks
├── webflow.json ✅
├── Dependencies ✅
└── Build test ✅

Step 2: Authentication
├── Checking for existing auth...
└── Found valid token ✅

Step 3: Deploying
├── Bundling components...
├── Uploading to workspace...
└── Processing...

Step 4: Verification
├── Library registered ✅
└── 4 components available ✅

🎉 Deployment Complete!
```

### CI/CD Deployment

```bash
# Set environment variable
export WEBFLOW_WORKSPACE_API_TOKEN=your-token-here

# Deploy without prompts
npx webflow library share --no-input
```

## Examples

**User prompt:**
```
Deploy my components to Webflow
```

**Response:**
```
🚀 Deploy Guide: Code Components

Let me guide you through deploying your component library.

---

## Step 1: Pre-Flight Checks

Running validation...

✅ webflow.json configured
✅ Dependencies installed
✅ Build succeeds
✅ Bundle size: 2.3MB (under 50MB limit)

All checks passed! Ready to deploy.

---

## Step 2: Authentication

**Option A: Interactive (Recommended for first time)**

Run the deploy command:
```bash
npx webflow library share
```

This will:
1. Open your browser for Webflow login
2. Ask you to authorize the app
3. Save credentials to .env

**Option B: API Token (For CI/CD or returning users)**

1. Get your Workspace API Token:
   - Go to Webflow Dashboard
   - Navigate to your Workspace Settings
   - Find "Apps & Integrations" → "Manage"
   - Under "Workspace API Access", click "Generate API Token"
   - Copy the token

2. Run with token:
```bash
npx webflow library share --api-token YOUR_TOKEN_HERE
```

Or set environment variable:
```bash
export WEBFLOW_WORKSPACE_API_TOKEN=YOUR_TOKEN_HERE
npx webflow library share
```

---

## Step 3: Deploy

Ready to deploy? Run:

```bash
npx webflow library share
```

Expected output:
```
✓ Bundling components...
✓ Authenticating...
✓ Uploading library...
✓ Processing...

Library "My Component Library" successfully shared!

Components:
- Button
- Card
- Accordion
- Modal

View in Designer: Open any site in your workspace
```

---

## Step 4: Verify in Designer

After deployment:

1. **Open Webflow Designer** for any site in your workspace
2. **Open Add Panel** (A key or + button)
3. **Find "Components"** section
4. **Look for your library** under custom components
5. **Drag a component** onto the canvas to test

---

## Step 5: Next Steps

✅ **Your components are live!**

**To update components later:**
```bash
# Make your changes, then re-deploy
npx webflow library share
```

**Important notes:**
- Updates replace the entire library (no partial updates)
- Existing component instances will update automatically
- Don't rename .webflow.tsx files (breaks instances)

---

💡 **Tips:**
- Add .env to .gitignore to protect your token
- Use `--verbose` flag for debugging issues
- Run `npx webflow library log` to see recent deploy logs
```

---

**Example: First-Time Setup**

```
🚀 Deploy Guide: First-Time Setup

I see this is your first deployment. Let me walk you through the full setup.

---

## Step 1: Get Workspace API Token

You'll need a Workspace API token to deploy:

1. **Open Webflow Dashboard**
   Go to webflow.com and log in

2. **Navigate to Workspace Settings**
   Click your workspace name → Settings

3. **Find API Access**
   Go to "Apps & Integrations" → "Manage"

4. **Generate Token**
   Under "Workspace API Access":
   - Click "Generate API Token"
   - Copy the token (you won't see it again!)

5. **Save Token**
   Add to your .env file:
   ```
   WEBFLOW_WORKSPACE_API_TOKEN=your-token-here
   ```

   ⚠️ Add .env to .gitignore:
   ```bash
   echo ".env" >> .gitignore
   ```

---

## Step 2: Deploy

Now run:
```bash
npx webflow library share
```

The CLI will:
1. Read your token from .env
2. Bundle your components
3. Upload to your workspace

---

## Step 3: Verify

After successful deploy:

1. Open Webflow Designer
2. Press 'A' to open Add panel
3. Find your components in the Components section
4. Drag onto canvas to test

---

🎉 **First deployment complete!**

Future deployments are simpler:
```bash
# Just run this after making changes
npx webflow library share
```
```

---

**Example: CI/CD Setup**

```
🚀 Deploy Guide: CI/CD Setup

Setting up automated deployments for your pipeline.

---

## GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Webflow

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Deploy to Webflow
        env:
          WEBFLOW_WORKSPACE_API_TOKEN: ${{ secrets.WEBFLOW_WORKSPACE_API_TOKEN }}
        run: npx webflow library share --no-input
```

---

## Add Secret to GitHub

1. Go to your repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `WEBFLOW_WORKSPACE_API_TOKEN`
4. Value: Your workspace API token
5. Click "Add secret"

---

## Key Flags for CI/CD

```bash
npx webflow library share --no-input
```

- `--no-input`: Disables interactive prompts
- Uses `WEBFLOW_WORKSPACE_API_TOKEN` env var automatically

---

## Optional: Add TypeScript Check

```yaml
- name: Type check
  run: npx tsc --noEmit
```

---

✅ **CI/CD configured!**

Now every push to main will automatically deploy your components.
```

## Validation

After deployment, verify success with these checks:

| Check | How to Verify |
|-------|---------------|
| Deploy completed | `npx webflow library share` exited without errors |
| Components visible | Open Designer Add panel → find your library |
| Import logs clean | `npx webflow library log` shows successful import |
| Bundle size OK | Output shows bundle under 50MB |
| Props work | Drag component onto canvas, verify props in right panel |

## Guidelines

### Terminology

The CLI command is `webflow library share`. This skill uses "deploy" as the user-facing term for consistency with common developer vocabulary. See the [CLI reference](../../references/CODE_COMPONENTS_REFERENCE.md) (Section 12) for full command documentation.

### Authentication Methods

| Method | Use Case | Command |
|--------|----------|---------|
| Interactive | First time, local dev | `npx webflow library share` |
| Environment variable | CI/CD, automation | Set `WEBFLOW_WORKSPACE_API_TOKEN` |
| CLI flag | One-off with different token | `--api-token TOKEN` |

### Pre-Deploy Checklist

Before every deployment:

- [ ] `npm install` is up to date
- [ ] Build succeeds locally
- [ ] Bundle under 50MB
- [ ] All component tests pass
- [ ] No SSR-breaking code (or ssr: false set)
- [ ] Props have default values where supported (not available for Link, Image, Slot, ID)

### Common Deploy Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Authentication failed" | Invalid/expired token | Regenerate workspace token |
| "Bundle too large" | Over 50MB | Optimize dependencies |
| "Library not found" | Wrong workspace | Check token workspace |
| "Build failed" | Code errors | Fix compilation errors |

### CLI Flags Reference

All flags for `npx webflow library share`:

| Flag | Description | Default |
|------|-------------|---------|
| `--manifest` | Path to `webflow.json` file | Scans current directory |
| `--api-token` | Workspace API token | Uses `WEBFLOW_WORKSPACE_API_TOKEN` from `.env` |
| `--no-input` | Skip interactive prompts (for CI/CD) | No |
| `--verbose` | Display more debugging information | No |
| `--dev` | Bundle in development mode (no minification) | No |

### Rollback & Versioning

- Each `library share` replaces the **entire** library — there are no partial updates
- There is **no built-in rollback** — use git to revert changes and re-deploy
- **Never rename `.webflow.tsx` files** — renaming creates a new component and removes the old one, breaking all existing instances in projects

### Debugging Commands

```bash
# Check recent deploy logs
npx webflow library log

# Verbose deploy output (detailed errors)
npx webflow library share --verbose

# Local bundle verification (catches build errors before deploying)
npx webflow library bundle --public-path http://localhost:4000/
```

### CI/CD Deployment

The GitHub Actions example above applies to any CI system. The key elements are:

```bash
# Generic CI pattern:
npm ci                                        # Install dependencies
npx webflow library share --no-input          # Deploy without prompts
# Requires WEBFLOW_WORKSPACE_API_TOKEN env var
```

### Post-Deploy Verification

Always verify after deployment:

1. **Check Designer**: Components appear in Add panel
2. **Test drag-and-drop**: Component renders on canvas
3. **Test props**: Props editable in right panel
4. **Test preview**: Component works in preview mode
5. **Test publish**: Component works on published site



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 10/22: local-dev-setup -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:local-dev-setup
description: Initialize a new Webflow Code Components project from scratch. Creates project structure, installs dependencies, configures webflow.json, and sets up development environment.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "1.1"
---

# Local Dev Setup

Set up a new Webflow Code Components project from scratch.

## When to Use This Skill

**Use when:**
- Starting a brand new code components project
- User asks to set up, initialize, or create a new project
- Adding code components to an existing React project
- Setting up the development environment for the first time

**Do NOT use when:**
- Project already exists and is configured (just answer questions directly)
- Creating individual components (use component-scaffold instead)
- Deploying components (use deploy-guide instead)

## Instructions

### Phase 1: Assess Current State

1. **Check if project exists**:
   - Is there an existing package.json?
   - Is there an existing webflow.json?
   - What's the current project structure?

2. **Determine setup type**:
   - New project from scratch
   - Add to existing React project
   - Add to existing Next.js/Vite project

### Phase 2: Project Initialization

3. **Create project structure** (if new):
   - Initialize npm project
   - Set up TypeScript
   - Create folder structure

4. **Install dependencies**:
   - Core: React, TypeScript
   - Webflow: CLI, data-types, react utils
   - Optional: Styling libraries

### Phase 3: Configuration

5. **Create webflow.json**:
   - Set library name
   - Configure component glob pattern
   - Set up globals if needed

6. **Configure TypeScript**:
   - Set up tsconfig.json
   - Enable JSX support

### Phase 4: Create Starter Files

7. **Create example component**:
   - Simple Button component
   - Definition file
   - Basic styling

8. **Create globals file** (optional):
   - For shared styles
   - For decorators

### Phase 5: Verify Setup

9. **Verify bundle compiles**:
   - Run `npx webflow library bundle --public-path http://localhost:4000/` to catch build errors locally
   - This verifies your components, imports, and configuration are correct
   - Full testing in the Webflow Designer requires deploying with `npx webflow library share`

10. **Provide next steps**:
    - How to create more components
    - How to deploy
    - Development workflow

## Examples

For detailed step-by-step examples, see [references/EXAMPLES.md](references/EXAMPLES.md).

**Available examples:**
1. **New Project from Scratch** - Complete setup with React, TypeScript, and CSS Modules
2. **Add to Existing React Project** - Integrate code components into an existing codebase
3. **With Tailwind CSS** - Setup with Tailwind CSS support

**Quick Start (New Project):**

```bash
# 1. Create project
mkdir my-webflow-components && cd my-webflow-components
npm init -y

# 2. Install dependencies
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
npm install -D @webflow/webflow-cli @webflow/data-types @webflow/react

# 3. Create webflow.json
echo '{"library":{"name":"My Library","components":["./src/**/*.webflow.tsx"]}}' > webflow.json

# 4. Create component directory
mkdir -p src/components/Button
```

Then create your component files (.tsx, .webflow.tsx, .module.css). See Example 1 in [references/EXAMPLES.md](references/EXAMPLES.md) for complete file contents including component, definition, and CSS files.

Deploy with:
```bash
npx webflow library share
```

## Validation

After setup, verify the project is correctly configured:

| Check | How to Verify |
|-------|---------------|
| `webflow.json` exists in project root | `cat webflow.json` |
| Dependencies installed | `npm list @webflow/webflow-cli` |
| Bundle compiles without errors | `npx webflow library bundle --public-path http://localhost:4000/` |
| At least one component found | Check bundle output for "Found N component(s)" |

## Guidelines

### Minimum Requirements

Every code components project needs:

1. **package.json** with dependencies
2. **webflow.json** with library config
3. **tsconfig.json** (for TypeScript)
4. At least one `.webflow.tsx` file

### Recommended Structure

```
project/
├── src/
│   ├── components/
│   │   └── [ComponentName]/
│   │       ├── [ComponentName].tsx
│   │       ├── [ComponentName].webflow.tsx
│   │       └── [ComponentName].module.css
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilities
│   ├── declarations.d.ts # CSS module types
│   ├── globals.ts       # Decorators/global imports
│   └── globals.css      # Global styles
├── package.json
├── tsconfig.json
├── webflow.json
└── .gitignore
```

### Development Workflow

1. **Create component**: Use [component-scaffold](../component-scaffold/SKILL.md) skill
2. **Develop locally**: Run React project to iterate (e.g., `npm run dev`)
3. **Validate**: Use [pre-deploy-check](../pre-deploy-check/SKILL.md) skill
4. **Deploy**: Use [deploy-guide](../deploy-guide/SKILL.md) skill or run `npx webflow library share`
5. **Test in Webflow**: Add component to page in Designer



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 11/22: pre-deploy-check -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:pre-deploy-check
description: Pre-deployment validation for Webflow Code Components. Checks bundle size, dependencies, prop configurations, SSR compatibility, styling setup, and common issues before running webflow library share.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "1.1"
---

# Build Validate

Validate code components before deployment to catch issues early.

## When to Use This Skill

**Use when:**
- User is about to deploy and wants to check for issues first
- Proactively before running `webflow library share`
- User asks to validate, check, or verify their components
- After making significant changes to components

**Do NOT use when:**
- Deployment already failed (use troubleshoot-deploy instead)
- Just building for local development
- Auditing code quality (use component-audit instead)

## Instructions

### Phase 1: Project Structure Check

1. **Verify webflow.json exists**:
   - Check for required fields (`library.name`, `library.components`)
   - Validate glob pattern matches component files — the recommended pattern is `"./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"` covering all supported extensions
   - Check `globals` path if specified — file must exist and be importable
   - Check `bundleConfig` path if specified — file must exist

2. **Check dependencies**:
   - Verify `@webflow/webflow-cli` installed
   - Verify `@webflow/data-types` installed
   - Verify `@webflow/react` installed
   - Check for version compatibility (check installed versions, don't assume specific versions)

3. **Verify component files**:
   - Find all `.webflow.tsx` / `.webflow.ts` files matching the glob pattern
   - Ensure matching React components exist
   - Check for orphaned definition files

4. **Validate imports in `.webflow.tsx` files**:
   - Must import `declareComponent` from `@webflow/react`
   - Must import `props` from `@webflow/data-types` (if props are defined)
   - Must import the actual React component being declared

### Phase 2: Component Analysis

5. **For each component, check**:
   - `declareComponent` is called with the component and a config object
   - `name` is provided in the config
   - All props have `name` properties and appropriate `defaultValue` where applicable
   - Prop types are valid — the 11 supported types are:
     - **Text** (alias: String) — single line text input
     - **RichText** — multi-line text with formatting
     - **TextNode** — single/multi-line text editable on canvas
     - **Link** — URL input (returns `{ href, target, preload }` object)
     - **Image** — image upload and selection
     - **Number** — numeric input
     - **Boolean** — true/false toggle
     - **Variant** — dropdown with predefined options (requires `options` array)
     - **Visibility** — show/hide controls
     - **Slot** — content areas for child components
     - **ID** — HTML element ID

6. **Validate component options**:
   - If `options` object is present, validate:
     - `applyTagSelectors` is a boolean (default: `false`) — enables site tag selectors in Shadow DOM
     - `ssr` is a boolean (default: `true`) — controls server-side rendering

7. **Check for SSR issues**:
   - Scan for browser-only API usage outside of `useEffect` or guarded blocks:
     - `window`, `document`, `localStorage`, `sessionStorage`, `navigator`
   - Flag dynamic/personalized content patterns (user-specific dashboards, authenticated views)
   - Flag heavy/interactive UI that doesn't benefit from SSR (charts, 3D scenes, maps, animation-heavy elements)
   - Flag non-deterministic output (random numbers, time-based values that differ server vs client)
   - Suggest `ssr: false` in options if component is purely interactive or browser-dependent

8. **Check styling**:
   - Verify styles are imported in `.webflow.tsx` or via globals file
   - Check for site class usage — site classes do NOT work in Shadow DOM
   - Site variables DO work: `var(--variable-name, fallback)`
   - Inherited CSS properties DO work: `font-family: inherit`
   - Tag selectors work IF `applyTagSelectors: true` is set in component options
   - Validate CSS-in-JS setup if used (see CSS-in-JS detection below)

9. **Check for Shadow DOM + React Context issues**:
   - If a component uses slots (`props.Slot`) AND imports/uses `useContext` or a Context Provider:
     - Warn that parent and child components in slots cannot share React Context — each child renders in its own Shadow DOM with a separate React root
     - Suggest alternatives: Nano Stores, custom events, URL parameters, or browser storage

### Phase 3: Build Test

10. **Run TypeScript/build check**:
    - Check for TypeScript compilation errors
    - Verify all imports resolve correctly
    - Identify any build-time issues

11. **Check bundle size**:
    - If a build output exists, verify total bundle size is under **50MB** (maximum bundle limit)
    - If over limit, flag as error and suggest optimization

12. **Run local bundle test** (optional, suggest to user):
    - Suggest running `npx webflow library bundle --public-path http://localhost:4000/` to test bundling before sharing
    - If bundling issues occur, suggest `--debug-bundler` flag to inspect the final webpack config

### Phase 4: Detect Framework-Specific Setup

13. **CSS-in-JS library detection**:
    - If project uses **styled-components**: verify `@webflow/styled-components-utils` is installed and `styledComponentsShadowDomDecorator` is exported from globals decorators array
    - If project uses **Emotion** or **Material UI** (`@emotion/styled`, `@emotion/react`, `@mui/material`): verify `@webflow/emotion-utils` is installed and `emotionShadowDomDecorator` is exported from globals decorators array

14. **Tailwind CSS detection**:
    - If project uses **Tailwind CSS** (`tailwindcss` in dependencies):
      - Verify `@tailwindcss/postcss` is installed
      - Verify `postcss.config.mjs` exists with `@tailwindcss/postcss` plugin
      - Verify Tailwind CSS is imported in globals file (e.g., `@import "tailwindcss"` in globals.css)

15. **Sass/Less preprocessor detection**:
    - If project uses **Sass** (`.scss` files or `sass` in dependencies): verify `sass` and `sass-loader` are installed, and a webpack config adds the `.scss` rule
    - If project uses **Less** (`.less` files or `less` in dependencies): verify `less` and `less-loader` are installed, and a webpack config adds the `.less` rule
    - For either: verify `bundleConfig` is set in `webflow.json` pointing to the webpack config

16. **Webpack custom config validation** (if `bundleConfig` is specified):
    - Verify the file exists at the specified path
    - Verify it uses CommonJS exports (`module.exports`)
    - Warn if it attempts to override blocked properties: `entry`, `output`, `target` (these are silently filtered out)
    - Verify `module.rules` uses function syntax `(currentRules) => { ... }`, not an array

### Phase 5: Report Results

17. **Generate validation report**:
    - List all checks performed
    - Show passed/failed/warning status
    - Provide fix suggestions for failures
    - Indicate deployment readiness

## Validation Checks

### Required Checks

| Check | Severity | Description |
|-------|----------|-------------|
| webflow.json exists | Error | Required for CLI |
| Dependencies installed | Error | `@webflow/webflow-cli`, `@webflow/data-types`, `@webflow/react` |
| Component files exist | Error | React + definition files present |
| declareComponent called | Error | Required in .webflow.tsx with correct imports |
| Valid prop types | Error | Only the 11 supported types (Text/String, RichText, TextNode, Link, Image, Number, Boolean, Variant, Visibility, Slot, ID) |
| Build succeeds | Error | No compilation errors |
| Bundle size < 50MB | Error | Maximum bundle limit enforced by Webflow |

### Warning Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Props have defaults | Warning | Better designer experience |
| SSR compatibility | Warning | Browser APIs, dynamic content, heavy UI, non-deterministic output |
| Styles imported | Warning | Styles may not appear in Shadow DOM |
| Site class usage | Warning | Site classes don't work in Shadow DOM — use component-specific classes |
| Shadow DOM + Context | Warning | Slots prevent React Context sharing between parent/child |
| CSS-in-JS decorator | Warning | styled-components/Emotion need Shadow DOM decorators |
| Tailwind setup | Warning | Missing postcss config or globals import |
| Sass/Less setup | Warning | Missing loaders or webpack config |
| Webpack blocked props | Warning | `entry`, `output`, `target` overrides are silently ignored |
| Webpack rules format | Warning | Must use function syntax, not array |
| Component options | Warning | `applyTagSelectors` and `ssr` must be booleans |
| Glob pattern coverage | Warning | Pattern should cover all supported extensions (.js, .jsx, .mjs, .ts, .tsx) |
| bundleConfig file | Warning | File must exist if specified in webflow.json |

### Info Checks

| Check | Severity | Description |
|-------|----------|-------------|
| Component count | Info | Number of components |
| Prop count | Info | Props per component |
| Bundle size | Info | Current bundle size vs 50MB limit |
| Frameworks detected | Info | CSS-in-JS, Tailwind, Sass/Less usage |

## Examples

**User prompt:**
```
Check if my components are ready to deploy
```

**Response:**
```
🔍 Build Validation: My Component Library

Running pre-deployment checks...

---

## Project Structure

✅ webflow.json found
✅ library.name: "My Component Library"
✅ library.components: "./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"
✅ globals: "./src/globals.ts"
✅ bundleConfig: not specified (using defaults)

---

## Dependencies

✅ @webflow/webflow-cli: installed
✅ @webflow/data-types: installed
✅ @webflow/react: installed
✅ react: installed
✅ typescript: installed

---

## Frameworks Detected

✅ Tailwind CSS detected
  ✅ @tailwindcss/postcss installed
  ✅ postcss.config.mjs found
  ✅ globals.css imports Tailwind

---

## Components Found (4)

### 1. Button ✅
- File: src/components/Button/Button.webflow.tsx
- Imports: ✅ declareComponent, ✅ props, ✅ Button component
- Props: label (Text), variant (Variant), disabled (Boolean)
- All props have defaults ✅
- SSR compatible ✅
- Options: applyTagSelectors: true ✅
- Styles imported ✅

### 2. Card ✅
- File: src/components/Card/Card.webflow.tsx
- Imports: ✅ declareComponent, ✅ props, ✅ Card component
- Props: title (Text), image (Image), content (RichText), link (Link)
- All props have defaults ✅
- SSR compatible ✅
- Styles imported ✅

### 3. Modal ⚠️
- File: src/components/Modal/Modal.webflow.tsx
- Imports: ✅ declareComponent, ✅ props, ✅ Modal component
- Props: title (Text), isOpen (Boolean), content (Slot)
- All props have defaults ✅
- ⚠️ SSR Issue: Uses `document.body` in render
  → Suggestion: Add `ssr: false` to options or wrap in useEffect
- Styles imported ✅

### 4. CartIcon ⚠️
- File: src/components/CartIcon/CartIcon.webflow.tsx
- Imports: ✅ declareComponent, ✅ CartIcon component
- Props: none
- ⚠️ Missing props - component has no editable properties
  → Suggestion: Consider adding props for designer customization
- ⚠️ Uses localStorage without SSR guard
  → Suggestion: Wrap in useEffect or useState initializer
- Styles imported ✅

---

## Build Test

✅ Build completed successfully
✅ No TypeScript errors
✅ No webpack errors
✅ Bundle size: 2.3MB / 50MB limit

---

## Summary

| Category | Status |
|----------|--------|
| Project Structure | ✅ Pass |
| Dependencies | ✅ Pass |
| Frameworks | ✅ Pass |
| Components | ⚠️ 2 warnings |
| Build | ✅ Pass |

---

## Ready to Deploy: ⚠️ WITH WARNINGS

You can deploy, but consider fixing these issues:

1. **Modal SSR Issue**
   Add to Modal.webflow.tsx:
   ```typescript
   options: {
     ssr: false
   }
   ```

2. **CartIcon localStorage Usage**
   Update CartIcon.tsx:
   ```typescript
   const [count, setCount] = useState(() => {
     if (typeof window === "undefined") return 0;
     return parseInt(localStorage.getItem("cartCount") || "0");
   });
   ```

---

💡 To deploy: `npx webflow library share`
💡 To test locally first: `npx webflow library bundle --public-path http://localhost:4000/`
```

---

**Example: Build Failure**

```
🔍 Build Validation: My Component Library

Running pre-deployment checks...

---

## Project Structure

✅ webflow.json found
⚠️ library.components uses narrow glob: "./src/**/*.webflow.tsx"
  → Recommendation: Use "./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)" to cover all supported extensions

---

## Dependencies

❌ Missing: @webflow/react
   Fix: npm install --save-dev @webflow/react

---

## Build Test

❌ Build Failed

Error in src/components/Button/Button.webflow.tsx:
```
Module not found: Error: Can't resolve '@webflow/react'
```

---

## Summary

| Category | Status |
|----------|--------|
| Dependencies | ❌ 1 error |
| Build | ❌ Failed |

---

## Ready to Deploy: ❌ NO

Fix the following before deployment:

1. **Install missing dependency**
   ```bash
   npm install --save-dev @webflow/react
   ```

2. **Re-run validation**
   After installing, run this check again.
```

---

**Example: CSS-in-JS Missing Decorator**

```
🔍 Build Validation: My Component Library

---

## Frameworks Detected

⚠️ styled-components detected but Shadow DOM decorator not configured
  → Install: npm install @webflow/styled-components-utils
  → Add to globals.ts:
    ```typescript
    import { styledComponentsShadowDomDecorator } from "@webflow/styled-components-utils";
    export const decorators = [styledComponentsShadowDomDecorator];
    ```
  → Reference globals in webflow.json:
    ```json
    { "library": { "globals": "./src/globals.ts" } }
    ```

Without this, styled-components styles will be injected into document.head
instead of the Shadow DOM, and your components will appear unstyled.
```

---

**Example: Webpack Config Issues**

```
🔍 Build Validation: My Component Library

---

## Webpack Configuration

⚠️ webpack.webflow.js: `module.rules` uses array syntax
  → Must use function syntax: `rules: (currentRules) => { return [...]; }`
  → Array syntax will not work — the function receives current rules to extend

⚠️ webpack.webflow.js: overrides `output` property
  → The `output` property is blocked and will be silently ignored
  → Blocked properties: entry, output, target

💡 Use `--debug-bundler` flag to inspect the final merged webpack config:
   npx webflow library bundle --debug-bundler
```

---

**Example: Shadow DOM Context Warning**

```
## Components Found (2)

### 1. ThemeProvider ⚠️
- File: src/components/ThemeProvider/ThemeProvider.webflow.tsx
- Props: theme (Variant), children (Slot)
- ⚠️ Shadow DOM + React Context Issue:
  Component uses Slot prop AND React Context (ThemeContext).
  Children placed in slots render in separate Shadow DOM containers
  with their own React roots — they cannot access this Context.

  Alternatives for cross-component state:
  - Nano Stores (lightweight reactive state)
  - Custom events (window.dispatchEvent/addEventListener)
  - URL parameters (for shareable state)
  - Browser storage (localStorage/sessionStorage)
```

---

## Guidelines

### Validation Order

Run checks in this order for efficiency:

1. Project structure (fast, catches obvious issues)
2. Dependencies (medium, required for build)
3. Component analysis (medium, catches code issues)
4. Framework detection (medium, validates CSS-in-JS/Tailwind/Sass setup)
5. Build test (slow, but required)

### SSR Detection Patterns

Look for these patterns that indicate SSR issues:

```typescript
// Direct browser API usage (will break SSR)
window.innerWidth
document.getElementById
localStorage.getItem
navigator.userAgent
sessionStorage.getItem

// Dynamic/personalized content (may cause hydration mismatch)
// User-specific dashboards, authenticated views

// Heavy/interactive UI (SSR adds no value, re-renders anyway)
// Charts, 3D scenes, maps, animation-driven elements

// Non-deterministic output (differs server vs client)
Math.random()
new Date().toLocaleString()

// Safe patterns (in useEffect or state initializer)
useEffect(() => {
  // Browser APIs here are fine
}, []);

useState(() => {
  if (typeof window === "undefined") return default;
  return window.innerWidth;
});
```

When SSR issues are found, prominently suggest the `ssr: false` option:
```typescript
export default declareComponent(MyComponent, {
  name: "My Component",
  options: {
    ssr: false  // Disables server-side rendering
  },
});
```

### CSS-in-JS / Tailwind / Preprocessor Detection

Check project dependencies and files to detect styling frameworks:

**styled-components:**
- Detect: `styled-components` in package.json dependencies
- Require: `@webflow/styled-components-utils` installed
- Require: `styledComponentsShadowDomDecorator` in globals decorators array

**Emotion / Material UI:**
- Detect: `@emotion/styled`, `@emotion/react`, or `@mui/material` in dependencies
- Require: `@webflow/emotion-utils` installed
- Require: `emotionShadowDomDecorator` in globals decorators array

**Tailwind CSS:**
- Detect: `tailwindcss` in dependencies
- Require: `@tailwindcss/postcss` installed
- Require: `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- Require: Tailwind import in globals CSS (`@import "tailwindcss"`)

**Sass:**
- Detect: `.scss` files in src or `sass` in dependencies
- Require: `sass` and `sass-loader` installed as dev dependencies
- Require: webpack config with `.scss` rule using function syntax for module.rules
- Require: `bundleConfig` set in webflow.json

**Less:**
- Detect: `.less` files in src or `less` in dependencies
- Require: `less` and `less-loader` installed as dev dependencies
- Require: webpack config with `.less` rule using function syntax for module.rules
- Require: `bundleConfig` set in webflow.json

### Webpack Config Validation Rules

When `bundleConfig` is specified in webflow.json:

1. File must exist at the specified path
2. Must use CommonJS: `module.exports = { ... }`
3. Blocked properties that are silently ignored: `entry`, `output`, `target`
4. `module.rules` must be a function, not an array: `rules: (currentRules) => { ... }`
5. `ModuleFederationPlugin` and `MiniCssExtractPlugin` are auto-deduplicated

### Common Build Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Can't resolve '@webflow/react'" | Missing dependency | `npm i -D @webflow/react` |
| "Cannot find module './Component'" | Wrong import path | Check relative paths |
| "Type 'X' is not assignable" | TypeScript error | Fix type mismatch |
| "Unexpected token" | Syntax error | Check JSX/TS syntax |
| "Maximum call stack" | Circular import | Break dependency cycle |
| Bundle exceeds 50MB | Too many/large dependencies | Tree-shake, lazy load, replace heavy libs |
| Styles not appearing | Missing Shadow DOM decorator | Add CSS-in-JS decorator or import styles in .webflow.tsx |

### Bundle Size Optimization

Quick wins for reducing bundle size:

1. **Use production build**: Ensure minification is enabled
2. **Tree-shake imports**: Import specific exports
3. **Replace heavy libraries**: moment → date-fns, lodash → lodash-es
4. **Lazy load**: Dynamic imports for heavy components
5. **Check for duplicates**: Multiple React versions, etc.
6. **Monitor size**: Bundle must stay under 50MB limit



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 12/22: troubleshoot-deploy -->
<!-- ═══════════════════════════════════════════════ -->

---
name: webflow-code-component:troubleshoot-deploy
description: Debug deployment failures for Webflow Code Components. Analyzes error messages, identifies root causes, and provides specific fixes for common issues.
compatibility: Node.js 18+, React 18+, TypeScript, @webflow/webflow-cli
metadata:
  author: webflow
  version: "1.1"
---

# Troubleshoot Deploy

Debug and fix deployment issues for Webflow Code Components.

## When to Use This Skill

**Use when:**
- `webflow library share` failed with an error
- Components deployed but aren't working correctly
- User shares an error message from deployment
- Bundle or compilation errors occurred

**Do NOT use when:**
- Deployment hasn't been attempted yet (use deploy-guide instead)
- Validating before deployment (use pre-deploy-check instead)
- General code quality issues (use component-audit instead)

## Instructions

### Phase 1: Gather Information

1. **Get error details**:
   - Ask for exact error message
   - Request output from `npx webflow library share`
   - Check if `npx webflow library log` has additional info

2. **Understand context**:
   - First deploy or update?
   - Recent changes made?
   - Working previously?

### Phase 2: Diagnose

3. **Identify error category**:
   - Authentication errors
   - Build/compilation errors
   - Bundle size errors
   - Network/upload errors
   - Configuration errors

4. **Analyze root cause**:
   - Parse error message
   - Check common causes
   - Identify specific issue

### Phase 3: Provide Solution

5. **Give specific fix**:
   - Step-by-step resolution
   - Code examples if needed
   - Verification steps

6. **Prevent recurrence**:
   - Explain why it happened
   - Suggest preventive measures

## Common Error Reference

For detailed solutions to each error, see [references/ERROR_CATALOG.md](references/ERROR_CATALOG.md).

### Quick Reference

| Error | Category | Quick Fix |
|-------|----------|-----------|
| "Authentication failed" | Auth | Regenerate API token in Workspace Settings |
| "Insufficient permissions" | Auth | Check workspace role and token |
| "Module not found" | Build | `npm install --save-dev @webflow/react` |
| "TypeScript errors" | Build | Run `npx tsc --noEmit` to find error |
| "Unexpected token" | Build | Check file extension is `.tsx` |
| "Bundle size exceeds limit" | Bundle | Tree-shake imports, lazy load heavy components |
| "Component not rendering" | Runtime | Check SSR issues, browser console |
| "Styles not appearing" | Runtime | Import CSS in .webflow.tsx file |
| "webflow.json not found" | Config | Create webflow.json in project root |
| "No components found" | Config | Check glob pattern and file extension |
| "Invalid JSON in webflow.json" | Config | Fix JSON syntax (trailing commas, comments) |
| "429 Too Many Requests" | Network | Wait 60 seconds and retry |
| "Request timed out" | Network | Check connectivity, proxy, Webflow status |
| "JavaScript heap out of memory" | Memory | `NODE_OPTIONS="--max-old-space-size=4096"` |
| "Circular dependency" | Build | Extract shared code, break import cycles |

### Most Common Fixes

**Authentication:**
```bash
# Regenerate token, then:
export WEBFLOW_WORKSPACE_API_TOKEN=your-new-token
npx webflow library share
```

**Missing Dependencies:**
```bash
npm install --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```

**SSR Issues:**
```typescript
// Wrap browser APIs in useEffect or disable SSR:
declareComponent(Component, { options: { ssr: false } });
```

**Missing Styles:**
```typescript
// In .webflow.tsx, import styles:
import "./Component.module.css";
```

## Debugging Commands

```bash
# Check recent deploy logs
npx webflow library log

# Verbose deploy output (shows detailed errors)
npx webflow library share --verbose

# Type check without deploying
npx tsc --noEmit
```

## Validation

The issue is resolved when all of the following are true:

| Success Criteria | How to Verify |
|-----------------|---------------|
| Deploy completes without errors | `npx webflow library share` exits cleanly |
| Components appear in Designer | Open Add panel in Designer and find your library |
| Import logs confirm success | `npx webflow library log` shows successful import |

## Guidelines

### Error Analysis Process

1. **Read the full error message** - Often contains the solution
2. **Check the error category** - Auth, build, bundle, or runtime
3. **Look for file paths** - Points to exact location
4. **Check line numbers** - For code errors
5. **Search error message** - May be a known issue

### When to Escalate

If none of the solutions work, gather this data before escalating:

1. **Deploy logs**: `npx webflow library log`
2. **Verbose output**: `npx webflow library share --verbose`
3. **Node.js version**: `node -v`
4. **Package versions**: `npm list @webflow/webflow-cli @webflow/data-types @webflow/react`
5. **Configuration**: Contents of `webflow.json`
6. **Error message**: Full error output (not just the summary line)

Then:
- Check **Webflow status page** for outages
- Search the **Webflow Community Forum** for your error message
- Contact **Webflow Support** with the collected data above



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 13/22: accessibility-audit -->
<!-- ═══════════════════════════════════════════════ -->

---
name: accessibility-audit
description: Run comprehensive accessibility audit (WCAG 2.1) on Webflow pages - checks buttons, forms, links, focus states, headings, keyboard navigation, and generates detailed reports with fixes. Requires Webflow Designer connection. Excludes image alt text (covered by asset-audit skill).
---

# Accessibility Audit

Comprehensive WCAG 2.1 accessibility audit for Webflow pages with detailed issue detection and actionable fixes.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify available sites
- Use Webflow MCP's `data_sites_tool` with action `get_site` to retrieve site details
- Use Webflow MCP's `data_pages_tool` with action `list_pages` to get all pages
- Use Webflow MCP's `element_tool` with action `get_all_elements` to get detailed element information (requires Designer)
- Use Webflow MCP's `element_tool` with action `add_or_update_attribute` to fix accessibility issues (requires Designer)
- Use Webflow MCP's `element_snapshot_tool` to get visual previews of elements
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)
- **Designer connection required** - This skill needs Designer to access element attributes and styles

## Instructions

### Phase 1: Site & Page Selection
1. **Get site information**: Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify target site
2. **Ask for page selection**:
   - If user provides page ID, use it directly
   - Otherwise, use `data_pages_tool` with action `list_pages` to show available pages
   - Let user select which page(s) to audit
3. **Confirm audit scope**: Ask user what to check:
   - Full audit (all accessibility checks)
   - Critical issues only (WCAG Level A)
   - Specific categories (forms, buttons, navigation, etc.)

### Phase 2: Element Extraction & Analysis
4. **Ensure Designer is connected**: Before proceeding, verify Webflow Designer is open and connected
   - If not connected, instruct user to open Designer and connect
   - This is required to access element attributes and styles
5. **Switch to target page**: Use `de_page_tool` with action `switch_page` to navigate to the page being audited
6. **Extract all elements**: Use `element_tool` with action `get_all_elements` for detailed analysis
   - Set `include_style_properties: true` to check focus styles
   - Set `include_all_breakpoint_styles: false` to minimize data
7. **Parse element data**: Identify interactive and content elements:
   - Buttons (Button, LinkBlock with button role)
   - Links (TextLink, Link, LinkBlock)
   - Form inputs (Input, Select, Textarea)
   - Headings (Heading elements with levels)
   - Interactive divs/spans (check for onClick or interactive roles)
   - Images (Image elements) - **SKIP for this audit**
8. **Extract attributes for each element**:
   - ARIA attributes (aria-label, aria-describedby, role, tabIndex)
   - DOM attributes (id, domId, href, type, placeholder)
   - Text content
   - Style properties (outline, border for focus states)
   - Element metadata (canHaveAttributes, tag name)

### Phase 3: Accessibility Checks

#### Critical Issues (Must Fix - WCAG Level A)
9. **Icon-only buttons without labels** (WCAG 4.1.2)
   - Find: Button elements with no text content
   - Check: Missing `aria-label` or `aria-labelledby`
   - Impact: Screen readers cannot identify button purpose
   - Fix: Add `aria-label` attribute with descriptive text

10. **Form inputs without labels** (WCAG 1.3.1)
    - Find: Input, Select, Textarea elements
    - Check: Missing associated label or `aria-label`
    - Impact: Users don't know what input is for
    - Fix: Add `aria-label` or associate with `<label>` using `id`

11. **Non-semantic click handlers** (WCAG 2.1.1)
    - Find: Div or Span elements (identified by element type)
    - Check: Interactive behavior without proper role/keyboard support
    - Impact: Not keyboard accessible, screen readers miss interactivity
    - Fix: Add `role="button"`, `tabIndex="0"`, suggest using real `<button>`

12. **Links without destination** (WCAG 2.1.1)
    - Find: Link elements with no `href` attribute
    - Check: Links that only use onClick without href
    - Impact: Not keyboard accessible, breaks browser features
    - Fix: Add proper `href` or convert to button

#### Serious Issues (Should Fix - WCAG Level AA)
13. **Focus outline removed without replacement** (WCAG 2.4.7)
    - Find: Elements with `outline: none` style
    - Check: No visible alternative focus indicator
    - Impact: Keyboard users can't see focus
    - Fix: Add visible focus style (border, box-shadow, background change)

14. **Missing keyboard handlers** (WCAG 2.1.1)
    - Find: Elements with onClick handlers
    - Check: Missing onKeyDown for Enter/Space keys
    - Impact: Not usable with keyboard alone
    - Fix: Add keyboard event handlers

15. **Touch target too small** (WCAG 2.5.5)
    - Find: Clickable elements (buttons, links)
    - Check: Width or height < 44px
    - Impact: Hard to tap on mobile devices
    - Fix: Increase padding or min-width/min-height to 44px

#### Moderate Issues (Consider Fixing)
16. **Heading hierarchy problems** (WCAG 1.3.1)
    - Find: Heading elements (h1-h6)
    - Check: Skipped levels (h1 → h3, skipping h2)
    - Impact: Confusing document structure
    - Fix: Use proper sequential heading levels

17. **Positive tabIndex** (WCAG 2.4.3)
    - Find: Elements with tabIndex > 0
    - Check: Disrupts natural tab order
    - Impact: Confusing keyboard navigation
    - Fix: Use tabIndex="0" or "-1" only, let natural DOM order work

18. **Role without required attributes** (WCAG 4.1.2)
    - Find: Elements with ARIA roles
    - Check: Missing required ARIA attributes (e.g., role="button" without tabIndex)
    - Impact: Incomplete accessibility semantics
    - Fix: Add required attributes for role

### Phase 4: Issue Categorization & Scoring
19. **Categorize all findings**:
    - Critical: Must fix (blocks access)
    - Serious: Should fix (significantly impacts usability)
    - Moderate: Consider fixing (improves experience)

20. **Calculate accessibility score** (0-100):
    - Start at 100
    - Critical issue: -10 points each
    - Serious issue: -5 points each
    - Moderate issue: -2 points each
    - Minimum score: 0

21. **Generate severity summary**:
    - Total issues found
    - Breakdown by severity
    - Most common issue types
    - Pages/sections most affected

### Phase 5: Report Generation
22. **Create detailed report** with specific format:
    ```
    ═══════════════════════════════════════════════════
    ACCESSIBILITY AUDIT: [Page Name]
    ═══════════════════════════════════════════════════

    CRITICAL (X issues)
    ───────────────────
    [A11Y] Element: Button "Submit"
      Issue: Button missing accessible name
      Location: Form section, element ID: {component: "abc", element: "xyz"}
      Current: <button><CloseIcon /></button>
      Fix: Add aria-label="Close"
      WCAG: 4.1.2 Name, Role, Value

    [A11Y] Element: Input field
      Issue: Form input without label
      Location: Contact form, element ID: {component: "def", element: "uvw"}
      Current: <input type="email" />
      Fix: Add aria-label="Email address" or associate with <label>
      WCAG: 1.3.1 Info and Relationships

    SERIOUS (X issues)
    ──────────────────
    [A11Y] Element: Link "Read more"
      Issue: Focus outline removed without visible alternative
      Location: Blog section
      Current: outline: none
      Fix: Add visible focus style (e.g., border: 2px solid blue)
      WCAG: 2.4.7 Focus Visible

    MODERATE (X issues)
    ───────────────────
    [A11Y] Element: Heading
      Issue: Heading hierarchy skipped (h1 → h3)
      Location: Article section
      Current: <h3>Subsection</h3> after <h1>Title</h1>
      Fix: Change to <h2> or add intermediate h2
      WCAG: 1.3.1 Info and Relationships

    ═══════════════════════════════════════════════════
    SUMMARY
    ───────────────────────────────────────────────────
    Total Issues: X
    - Critical: X issues
    - Serious: X issues
    - Moderate: X issues

    Accessibility Score: XX/100

    Most Common Issues:
    1. [Issue type] - X occurrences
    2. [Issue type] - X occurrences
    3. [Issue type] - X occurrences
    ═══════════════════════════════════════════════════
    ```

23. **Provide actionable insights**:
    - Prioritized fix list (critical first)
    - Quick wins (easy fixes with big impact)
    - Design pattern recommendations
    - Resources for learning more

### Phase 6: Fix Suggestions & Approval (Optional)
24. **Offer to fix issues automatically**: Designer is already connected, so offer auto-fixes
25. **Show preview of fixes**:
    ```
    Which issues would you like to fix?

    [1] ✓ Add aria-label to Submit button
        Element: Button in contact form
        Fix: Add aria-label="Submit contact form"
        Safe: Yes (adding attribute only)

    [2] ✓ Add aria-label to email input
        Element: Input in contact form
        Fix: Add aria-label="Email address"
        Safe: Yes

    [3] ⚠️ Fix heading hierarchy
        Element: h3 in article section
        Fix: Change heading level from h3 to h2
        Safe: May affect visual styling

    Type numbers to skip (e.g., "3"), "all" for all, "none" to cancel
    ```

26. **Apply approved fixes**: Use `element_tool` with action `add_or_update_attribute`
    - Process in batches
    - Show progress for large fix sets
    - Report success/failure for each

27. **Generate post-fix report**:
    - Issues fixed: X
    - Issues remaining: Y
    - New accessibility score: XX/100 (improved from YY/100)

### Phase 7: Export & Resources (Optional)
28. **Offer export formats**:
    - Markdown (readable documentation)
    - JSON (machine-readable for tracking)
    - CSV (spreadsheet for team review)

29. **Provide resources**:
    - WCAG 2.1 quick reference links
    - Webflow accessibility best practices
    - Recommended testing tools (browser extensions, screen readers)

## Important Considerations

### What This Skill Checks
✅ Button accessibility (labels, roles)
✅ Form input labels and associations
✅ Link semantics and keyboard access
✅ Focus visibility and keyboard navigation
✅ Heading hierarchy and structure
✅ ARIA roles and attributes
✅ Touch target sizes
✅ Interactive element semantics

### What This Skill Does NOT Check
❌ Image alt text (use **asset-audit** skill instead)
❌ Color contrast ratios (requires visual analysis)
❌ Animation/motion preferences
❌ Screen reader testing (needs manual verification)
❌ Content readability (language level, clarity)

### Limitations
- Cannot detect visual-only issues (color contrast, small text)
- Cannot test actual screen reader behavior
- Cannot validate content quality or clarity
- Relies on element attributes and structure only

## Examples

### Example 1: Full Page Audit

**User prompt:**
```
Run an accessibility audit on my homepage
```

**Step 1: Site & Page Selection**
```
🔍 Accessibility Audit: Page Selection

I'll help you audit your homepage for accessibility issues.

First, let me get your site information...

Available sites:
1. Company Website
2. Portfolio Site

Which site? (1/2)
```

**User response:** `1`

**Step 2: Page Selection**
```
Available pages in Company Website:
1. Home (/)
2. About (/about)
3. Contact (/contact)
4. Blog (/blog)

Which page would you like to audit? (1 for Home)
```

**User response:** `1`

**Step 3: Audit Scope**
```
What level of audit would you like?

1. Full audit (all WCAG checks) - Recommended
2. Critical issues only (Level A compliance)
3. Specific categories (buttons, forms, navigation)

Your choice: (1/2/3)
```

**User response:** `1`

**Step 4: Audit Progress**
```
🔄 Running Accessibility Audit...

Progress:
✅ Extracted page content (45 elements)
✅ Analyzing buttons and interactive elements
✅ Checking form inputs and labels
✅ Validating heading hierarchy
✅ Checking keyboard navigation
🔄 Analyzing focus states...

Analysis complete!
```

**Step 5: Report**
```
═══════════════════════════════════════════════════
ACCESSIBILITY AUDIT: Home
═══════════════════════════════════════════════════

CRITICAL (3 issues)
───────────────────
[A11Y] Element: Button (navigation toggle)
  Issue: Icon-only button missing accessible name
  Location: Header navigation
  Element ID: {component: "nav-01", element: "btn-menu"}
  Current: <button><MenuIcon /></button>
  Fix: Add aria-label="Open navigation menu"
  WCAG: 4.1.2 Name, Role, Value

[A11Y] Element: Input (email subscription)
  Issue: Form input without label
  Location: Footer, newsletter signup
  Element ID: {component: "footer-01", element: "email-input"}
  Current: <input type="email" placeholder="Enter email" />
  Fix: Add aria-label="Email address for newsletter"
  WCAG: 1.3.1 Info and Relationships

[A11Y] Element: Div (clickable card)
  Issue: Non-semantic interactive element
  Location: Services section, card 2
  Element ID: {component: "services-01", element: "card-02"}
  Current: <div onClick={...}>Service card</div>
  Fix: Convert to <button> or add role="button" + tabIndex="0"
  WCAG: 2.1.1 Keyboard

SERIOUS (5 issues)
──────────────────
[A11Y] Element: Link "Learn more"
  Issue: Focus outline removed without visible alternative
  Location: Hero section
  Element ID: {component: "hero-01", element: "cta-link"}
  Current: outline: none
  Fix: Add focus style - border: 2px solid #0066cc or box-shadow
  WCAG: 2.4.7 Focus Visible

[A11Y] Element: Button "Subscribe"
  Issue: Touch target too small (30px × 36px)
  Location: Footer newsletter form
  Element ID: {component: "footer-01", element: "submit-btn"}
  Current: Small button
  Fix: Increase padding or set min-height: 44px
  WCAG: 2.5.5 Target Size

[continues with 3 more serious issues...]

MODERATE (4 issues)
───────────────────
[A11Y] Element: Heading "Our Services"
  Issue: Heading hierarchy skipped (h1 → h3)
  Location: Services section
  Element ID: {component: "services-01", element: "heading"}
  Current: <h3>Our Services</h3> follows <h1>Welcome</h1>
  Fix: Change to <h2> to maintain proper hierarchy
  WCAG: 1.3.1 Info and Relationships

[continues with 3 more moderate issues...]

═══════════════════════════════════════════════════
SUMMARY
───────────────────────────────────────────────────
Total Issues: 12
- Critical: 3 issues (must fix)
- Serious: 5 issues (should fix)
- Moderate: 4 issues (consider fixing)

Accessibility Score: 64/100

Most Common Issues:
1. Missing button labels - 2 occurrences
2. Focus styles removed - 3 occurrences
3. Heading hierarchy problems - 2 occurrences

Quick Wins (Easy + High Impact):
✨ Add aria-label to icon buttons (2 min, +20 score points)
✨ Add input labels (5 min, +10 score points)
✨ Add focus styles (10 min, +15 score points)

═══════════════════════════════════════════════════

💡 Next Steps:
1. Fix critical issues first (blocks access for some users)
2. Add visible focus styles for keyboard users
3. Test with keyboard navigation (Tab, Enter, Space keys)
4. Consider testing with screen reader (NVDA/JAWS/VoiceOver)

Would you like me to help fix these issues? (requires Designer connection)
```

### Example 2: Multi-Page Audit

**User prompt:**
```
Audit accessibility across my entire site
```

**Agent response:**
```
🔍 Multi-Page Accessibility Audit

I'll audit all pages on your site for accessibility issues.

Found 8 pages:
1. Home
2. About
3. Services
4. Team
5. Blog
6. Blog Post Template (CMS)
7. Contact
8. Privacy Policy

This will take approximately 2-3 minutes.

Proceed with full site audit? (yes/no)
```

**User:** `yes`

**Progress:**
```
🔄 Auditing Site Accessibility...

Progress: ████████████░░░░░░░░ 60% (5/8 pages)

✅ Home - Score: 64/100 (12 issues)
✅ About - Score: 78/100 (6 issues)
✅ Services - Score: 71/100 (9 issues)
✅ Team - Score: 85/100 (4 issues)
✅ Blog - Score: 82/100 (5 issues)
🔄 Analyzing Blog Post Template...
```

**Final Report:**
```
═══════════════════════════════════════════════════
SITE-WIDE ACCESSIBILITY AUDIT
═══════════════════════════════════════════════════

OVERALL SCORE: 73/100

Pages Audited: 8
Total Issues: 48
- Critical: 11 issues
- Serious: 21 issues
- Moderate: 16 issues

═══════════════════════════════════════════════════
ISSUES BY PAGE
═══════════════════════════════════════════════════

🔴 Lowest Scores (Need Attention):
1. Home - 64/100 (12 issues: 3 critical, 5 serious, 4 moderate)
2. Services - 71/100 (9 issues: 2 critical, 5 serious, 2 moderate)
3. About - 78/100 (6 issues: 1 critical, 3 serious, 2 moderate)

🟢 Highest Scores:
1. Team - 85/100 (4 issues: 0 critical, 2 serious, 2 moderate)
2. Blog - 82/100 (5 issues: 1 critical, 2 serious, 2 moderate)

═══════════════════════════════════════════════════
SITE-WIDE PATTERNS
═══════════════════════════════════════════════════

Most Common Issues Across Site:
1. Missing button labels (icon buttons) - 8 occurrences
   Pages affected: Home, Services, Blog, Contact

2. Focus outline removed - 12 occurrences
   Pages affected: All pages (site-wide CSS issue)

3. Form inputs without labels - 5 occurrences
   Pages affected: Home, Contact

4. Small touch targets (<44px) - 9 occurrences
   Pages affected: Home, About, Services, Contact

═══════════════════════════════════════════════════
RECOMMENDATIONS
═══════════════════════════════════════════════════

🎯 Site-Wide Fixes (Fix Once, Helps Everywhere):
1. Add focus styles to global CSS (affects 12 issues across all pages)
2. Update button component to require aria-label (affects 8 issues)
3. Increase minimum touch target size in design system (affects 9 issues)

📋 Page-Specific Priorities:
1. Home page: Fix navigation menu button and newsletter form
2. Services page: Add labels to service card interactions
3. Contact page: Add proper labels to all form inputs

💡 Design System Improvements:
- Create accessible button component with required aria-label
- Add focus state variants to all interactive components
- Set minimum touch target size standard (44px)

Would you like:
1. Detailed report for specific page
2. Export findings to file (Markdown/JSON/CSV)
3. Help fixing site-wide issues (requires Designer)
```

### Example 3: Critical Issues Only

**User prompt:**
```
Check my contact page for critical accessibility issues only
```

**Agent response:**
```
🔍 Critical Issues Audit: Contact Page

Running quick scan for blocking accessibility issues...

✅ Page analyzed

═══════════════════════════════════════════════════
CRITICAL ISSUES: Contact Page
═══════════════════════════════════════════════════

Found: 4 critical issues

[1] Form Input Missing Label
    Element: Email input field
    Location: Contact form, top
    Issue: No accessible name for screen readers
    Fix: Add aria-label="Your email address"
    WCAG: 1.3.1 (Level A)

[2] Form Input Missing Label
    Element: Message textarea
    Location: Contact form, bottom
    Issue: No accessible name for screen readers
    Fix: Add aria-label="Your message"
    WCAG: 1.3.1 (Level A)

[3] Button Missing Label
    Element: Submit button
    Location: Contact form, bottom
    Issue: Icon-only button with no text
    Fix: Add aria-label="Submit contact form"
    WCAG: 4.1.2 (Level A)

[4] Non-Semantic Interactive Element
    Element: Social media link (Instagram)
    Location: Footer
    Issue: Div with onClick instead of proper link
    Fix: Convert to <a href="..."> with aria-label="Instagram"
    WCAG: 2.1.1 (Level A)

═══════════════════════════════════════════════════

⚠️ Impact: These issues prevent screen reader users from using your contact form.

🔧 Estimated fix time: 5 minutes

Would you like me to:
1. Run full audit (includes serious and moderate issues)
2. Fix these 4 critical issues now (requires Designer)
3. Export this report (Markdown/JSON/CSV)
```

## Safety Rules

### Preview & Confirmation
- Always show detailed issue list before suggesting fixes
- Clearly mark severity levels (critical/serious/moderate)
- Explain impact of each issue in user-friendly terms
- Provide specific WCAG reference for each finding

### Granular Approval for Fixes
- Allow user to select which issues to fix
- Warn about fixes that might affect visual design
- Process fixes in batches with progress indicators
- Report success/failure for each fix attempt

### Error Handling
- If page cannot be accessed, explain clearly
- If Designer not connected, list limitations
- If element cannot be modified, suggest manual fix
- Separate automated fixes from manual review items

### Validation
- Verify element types before suggesting fixes
- Check if element supports attributes before adding
- Test that suggested fixes are valid for element type
- Warn if fix might break existing functionality

## Output Standards

### Icons & Formatting
- 🔍 Discovery/Analysis
- 🔄 Processing
- ✅ Pass/Success
- ❌ Fail/Critical Issue
- ⚠️ Warning/Serious Issue
- 💡 Suggestion/Moderate Issue
- 📊 Report/Summary
- 🎯 Priority/Action Item
- 🔴 Critical Priority
- 🟡 Medium Priority
- 🟢 Low Priority

### Report Structure
1. Clear severity categorization
2. Specific element identification with IDs
3. Current state vs recommended fix
4. WCAG reference for each issue
5. Summary with actionable priorities
6. Score for measurable progress

### Communication
- Use clear, jargon-free language
- Explain WHY something is an issue (impact on users)
- Provide specific, actionable fixes
- Encourage testing with real assistive technology
- Emphasize that automated checks are just the start

## Resources to Include

### WCAG 2.1 Quick Reference
- https://www.w3.org/WAI/WCAG21/quickref/

### Webflow Accessibility Resources
- Webflow University: Accessibility best practices
- Using semantic HTML in Webflow
- Adding ARIA attributes in Webflow

### Testing Tools
- Keyboard: Tab, Shift+Tab, Enter, Space
- Screen readers: NVDA (Windows), JAWS, VoiceOver (Mac/iOS)
- Browser extensions: axe DevTools, WAVE, Lighthouse

### Common Fixes
- Button labels: Always include visible text or aria-label
- Form labels: Use Webflow's label element or aria-label
- Focus styles: Use :focus-visible pseudo-class
- Semantic HTML: Use proper elements (button, a, label)



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 14/22: asset-audit -->
<!-- ═══════════════════════════════════════════════ -->

---
name: asset-audit
description: Analyze assets on a Webflow site for SEO optimization. Identifies assets missing alt text and assets with non-SEO-friendly names, then generates and applies improvements.
---

# Asset Audit

Analyze assets on a Webflow site for SEO optimization.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `asset_tool` for fetching and updating assets
- Use Webflow MCP's `get_image_preview` for analyzing image content
- Use Webflow MCP's `data_sites_tool` with action `list_sites` for listing available sites
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Site Selection & Asset Discovery
1. **Get site**: Identify the target site. If user does not provide site ID, ask for it.
2. **Fetch all assets**: Use Webflow MCP's `asset_tool` to get all assets from the site
   - For sites with 50+ assets, process in batches of 20
   - Show progress: "Processing assets 1-20 of 150..."
3. **Detect patterns**: Analyze asset naming for common patterns:
   - Camera uploads (IMG_, DSC_, etc.)
   - Screenshots (screenshot, Screen Shot, etc.)
   - Generic names (untitled, image-1, etc.)
   - Date-based names (2024-01-10, etc.)

### Phase 2: Issue Analysis & Pattern Recognition
4. **Identify issues**: List all assets which:
   - Do not have alt text set (null or empty string)
   - Have existing alt text but it's poor quality (too short, redundant phrases, etc.)
   - Do not have SEO-friendly asset names
   - Are duplicates or very similar
5. **Pattern detection report**: Show detected patterns:
   ```
   🔍 Detected patterns:
   - 15 assets start with "IMG_" (camera uploads)
   - 8 assets contain "screenshot"
   - Suggest: Bulk rename these patterns
   ```
6. **Ask user preference**: Ask if they want to generate:
   - Alt text only
   - SEO-friendly names only
   - Both
   - Apply naming pattern/template

### Phase 3: Analysis & Suggestion Generation
7. **Analyze assets**: Use Webflow MCP's `get_image_preview` tool to analyze the assets that need updates
   - **Error handling**: If Webflow MCP's `get_image_preview` fails, use fallback:
     - Extract description from existing filename
     - Use generic placeholder with warning
     - Continue with other assets
   - Process in batches to avoid timeout
8. **Generate suggestions with validation**:
   - **Alt text validation**:
     - Max 125 characters (warn if longer)
     - No redundant phrases ("image of", "picture of", "photo of")
     - Must end with punctuation
     - Flag generic descriptions (confidence < 50%)
   - **SEO name validation**:
     - Only lowercase a-z, 0-9, hyphens
     - No double extensions (.webp.webp) - strip existing extension first
     - Max 100 characters
     - Replace spaces/underscores with hyphens
     - No special characters
9. **Folder organization suggestions**: If patterns detected, suggest folder structure:
   ```
   💡 Organization suggestions:
   - Create "team-photos" folder for 8 team images
   - Create "product-images" folder for 15 product shots
   ```

### Phase 4: Granular Approval & Application
10. **Present suggestions with granular approval**:
    - Show numbered list with checkboxes
    - Allow individual toggle: "Enter numbers to skip (e.g., '2,4')"
    - Options: "all", "none", or specific numbers
    - Show validation warnings for each suggestion
11. **Offer naming template** (if many similar assets):
    ```
    🎨 Apply naming pattern?
    1. [category]-[description] (e.g., team-john-headshot)
    2. [description]-[location] (e.g., office-workspace-desk)
    3. Custom pattern...
    4. Skip patterns, use individual names
    ```
12. **Store rollback data**: Before applying changes, store:
    - Original asset names
    - Original alt text
    - Timestamp
    - Assets modified
13. **Apply updates**: Use Webflow MCP's `asset_tool` to update approved assets only
    - Show progress for batch updates
    - Handle partial failures gracefully
    - Report successes and failures separately
14. **Offer rollback option**: After changes applied:
    ```
    📋 Rollback Available:
    Last update: 4 assets modified 2 minutes ago
    Type "undo" to revert these changes
    ```

## Examples

**User prompt:**
```
Run an asset audit on my site.
```

**Step 1: Initial Audit Report**
```
📊 SEO Asset Audit: MCP Demo #2

Total: 4 assets

🔍 Detected patterns:
- 4 assets have generic numeric names (1.webp, 2.webp, 3.webp, 4.webp)
- All assets are in WebP format ✓

⚠️ Missing Alt Text (4 assets):
├── 1.webp (empty alt text)
├── 2.webp (empty alt text)
├── 3.webp (empty alt text)
└── 4.webp (empty alt text)

⚠️ Non-SEO-Friendly Names (4 assets):
├── 1.webp (generic numeric name)
├── 2.webp (generic numeric name)
├── 3.webp (generic numeric name)
└── 4.webp (generic numeric name)

---

What would you like to generate?
1. Alt text only
2. SEO-friendly names only
3. Both alt text and SEO-friendly names

Please select an option (1, 2, or 3).
```

**Example with Validation Warnings:**
```
📋 Suggested Improvements:

[1] ✓ IMG_1234.jpg
    Alt text: "Professional team member headshot with blue background."
    New name: professional-team-member-headshot.jpg
    ✅ Validation passed

[2] ✓ screenshot-2024.png
    Alt text: "Dashboard analytics overview showing user engagement metrics."
    New name: dashboard-analytics-overview.png
    ✅ Validation passed

[3] ⚠️ untitled-image.webp
    Alt text: "Photo"
    ⚠️ Warning: Alt text too short (< 10 chars) - needs more detail
    New name: untitled-image.webp
    ⚠️ Warning: Unable to generate better name (image preview failed)

[4] ⚠️ TeamPhoto2024!!!.jpg
    Alt text: "Image of a person working on laptop in modern office with plants and natural lighting through large windows in the background."
    ⚠️ Warning: Alt text too long (137 chars) - consider shortening for screen readers
    New name: team-photo-2024.jpg
    ✅ Validation passed (special characters removed)

Which assets would you like to update?
```

**Step 2: After user selects option 3 and images are analyzed**
```
📋 Suggested Improvements:

[1] ✓ 1.webp
    Alt text: "Podcast host with headphones and microphone recording Webflow podcast episode in studio."
    New name: webflow-podcast-host-recording-studio.webp
    ✅ Validation passed

[2] ✓ 2.webp
    Alt text: "Professional developer wearing glasses working on laptop with Webflow logo in modern office."
    New name: developer-working-laptop-webflow-office.webp
    ✅ Validation passed

[3] ✓ 3.webp
    Alt text: "Webflow homepage hero section with tagline and email signup form."
    New name: webflow-homepage-hero-section.webp
    ✅ Validation passed

[4] ✓ 4.webp
    Alt text: "Speaker presenting on stage at Webflow Conf with audience watching."
    New name: webflow-conf-speaker-presentation-stage.webp
    ✅ Validation passed

---

Which assets would you like to update?
- Type numbers to skip (e.g., "2,4" to skip items 2 and 4)
- Type "all" to proceed with all
- Type "none" to cancel
```

**Step 3: After user confirms with "all"**
```
🔄 Applying updates...

Progress: ████████████████████ 100% (4/4 assets)

✅ Updates Applied Successfully!

SEO Asset Audit Complete: MCP Demo #2

Summary:
- ✅ 4 assets updated successfully
- ❌ 0 assets failed
- ⏭️ 0 assets skipped

Changes Applied:
┌─────────────────────────────────────────────────────────────────┐
│ [1] webflow-podcast-host-recording-studio.webp                  │
│     ✓ Alt text added                                            │
│     ✓ Filename updated                                          │
├─────────────────────────────────────────────────────────────────┤
│ [2] developer-working-laptop-webflow-office.webp                │
│     ✓ Alt text added                                            │
│     ✓ Filename updated                                          │
├─────────────────────────────────────────────────────────────────┤
│ [3] webflow-homepage-hero-section.webp                          │
│     ✓ Alt text added                                            │
│     ✓ Filename updated                                          │
├─────────────────────────────────────────────────────────────────┤
│ [4] webflow-conf-speaker-presentation-stage.webp                │
│     ✓ Alt text added                                            │
│     ✓ Filename updated                                          │
└─────────────────────────────────────────────────────────────────┘

📋 Rollback Available:
Last update: 4 assets modified just now
Type "undo" to revert these changes

---

🎉 Your site's assets are now fully optimized for SEO and accessibility!
```

**Alternative Step 3: User selects specific assets (e.g., "1,3")**
```
🔄 Applying updates to assets 1 and 3...

Progress: ████████████████████ 100% (2/2 assets)

✅ Partial Update Complete!

Summary:
- ✅ 2 assets updated successfully
- ❌ 0 assets failed
- ⏭️ 2 assets skipped (as requested)

Changes Applied:
┌─────────────────────────────────────────────────────────────────┐
│ [1] webflow-podcast-host-recording-studio.webp                  │
│     ✓ Alt text added                                            │
│     ✓ Filename updated                                          │
├─────────────────────────────────────────────────────────────────┤
│ [3] webflow-homepage-hero-section.webp                          │
│     ✓ Alt text added                                            │
│     ✓ Filename updated                                          │
└─────────────────────────────────────────────────────────────────┘

Skipped Assets (can run audit again later):
- [2] 2.webp
- [4] 4.webp

📋 Rollback Available:
Type "undo" to revert these 2 changes
```

## Guidelines

### Phase 1: Critical Validations (Must Follow)

**File Extension Handling:**
- ALWAYS strip existing extension before adding new one
- Bad: `image.webp` → `new-name.webp.webp`
- Good: `image.webp` → `new-name.webp`
- Implementation: Use filename without extension + new extension

**Alt Text Quality Rules:**
- Max length: 125 characters (accessibility best practice)
- Must end with punctuation (period, exclamation, question mark)
- Remove redundant phrases:
  - ❌ "Image of a person" → ✅ "Person working at desk"
  - ❌ "Picture of logo" → ✅ "Company logo on blue background"
  - ❌ "Photo showing" → ✅ Direct description
- Flag if too short (< 10 chars): ⚠️ "Too generic - needs more detail"
- Flag if too long (> 125 chars): ⚠️ "Consider shortening for screen readers"

**SEO Filename Rules:**
- Only allow: lowercase a-z, numbers 0-9, hyphens
- Max length: 100 characters (before extension)
- Convert spaces to hyphens: `team photo` → `team-photo`
- Convert underscores to hyphens: `team_photo` → `team-photo`
- Remove special characters: `photo!@#$` → `photo`
- Convert to lowercase: `TeamPhoto` → `team-photo`
- Remove consecutive hyphens: `team--photo` → `team-photo`
- Trim leading/trailing hyphens: `-photo-` → `photo`

### Phase 2: Batch Processing & Performance

**Large Site Handling:**
- Sites with 50+ assets: Process in batches of 20
- Show progress: "Processing batch 1 of 5 (assets 1-20)..."
- Allow user to process specific batches
- Timeout protection: If Webflow MCP's `get_image_preview` takes > 30s, skip to next batch

**Pattern Detection:**
Detect and report these patterns:
- Camera uploads: `IMG_`, `DSC_`, `DCIM_`, `P_`
- Screenshots: `screenshot`, `Screen Shot`, `Capture`
- Generic names: `untitled`, `image-1`, `photo`, `asset`
- Date formats: `2024-01-10`, `20240110`, `01-10-2024`
- Suggest bulk rename when 3+ assets match a pattern

**Error Handling:**
- If Webflow MCP's `get_image_preview` fails:
  1. Log the error (don't show to user)
  2. Use fallback: Extract description from filename
  3. Mark with ⚠️ warning: "Generated from filename (image preview failed)"
  4. Continue with other assets
- Partial success handling:
  - Report successes separately from failures
  - Show: "✅ 15 updated, ❌ 2 failed, ⏭️ 3 skipped"
  - Offer to retry failed assets

### Phase 3: Advanced Features

**Granular Approval System:**
- Number each suggestion: `[1]`, `[2]`, `[3]`, etc.
- Show checkmark status: `✓` or `✗`
- Accept multiple formats:
  - "all" - approve all
  - "none" - cancel operation
  - "1,3,5" - skip items 1, 3, and 5
  - "2-5" - skip items 2 through 5
- Always show validation status per item

**Naming Templates:**
Offer templates when 5+ similar assets detected:
1. `[category]-[description]-[modifier]`
   - Example: `product-laptop-front-view.jpg`
2. `[description]-[location]-[year]`
   - Example: `team-photo-office-2024.jpg`
3. `[type]-[name]-[variant]`
   - Example: `icon-arrow-blue.svg`

**Folder Organization:**
Suggest folders when detecting:
- 5+ images with "team", "staff", "employee" → `team-photos` folder
- 5+ images with "product", "item" → `product-images` folder
- 5+ images with "logo", "brand" → `branding` folder
- 5+ images with "screenshot", "capture" → `screenshots` folder

**Rollback System:**
Before any update, store in memory:
```json
{
  "timestamp": "2026-01-10T00:45:00Z",
  "assets": [
    {
      "id": "asset-id",
      "originalName": "1.webp",
      "originalAltText": "",
      "newName": "podcast-host.webp",
      "newAltText": "Podcast host recording..."
    }
  ]
}
```
- Offer undo for 5 minutes after changes
- Clear rollback data after next audit starts
- Show rollback option in final summary

**Duplicate Detection:**
- Compare asset sizes (exact match = likely duplicate)
- Compare filenames (similar names = potential duplicate)
- Report: "⚠️ Potential duplicates: asset1.jpg (2.4MB) and asset1-copy.jpg (2.4MB)"
- Don't auto-delete - let user decide

### General Best Practices

- Always use Webflow MCP's `get_image_preview` to understand image content
- Generate specific, descriptive suggestions (not generic)
- Validate all suggestions before presenting to user
- Handle partial operations gracefully
- Provide clear progress indicators for long operations
- Group similar issues together in reports
- Use visual indicators: ✅ ⚠️ ❌ 🔍 💡 📋 🎉
- Be conversational but concise
- Always offer rollback after changes




<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 15/22: bulk-cms-update -->
<!-- ═══════════════════════════════════════════════ -->

---
name: bulk-cms-update
description: Create or update multiple CMS items in a Webflow collection with validation and diff preview. Use when adding multiple blog posts, products, or updating fields across many items.
---

# Bulk CMS Update

Create or update multiple CMS items with comprehensive validation, granular approval, and rollback capability.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `data_sites_tool` with action `list_sites` for listing available sites
- Use Webflow MCP's `data_cms_tool` with action `get_collection_list` for listing CMS collections
- Use Webflow MCP's `data_cms_tool` with action `get_collection_details` for fetching collection schemas
- Use Webflow MCP's `data_cms_tool` with action `list_collection_items` for retrieving existing items
- Use Webflow MCP's `data_cms_tool` with action `create_collection_items` for creating items (draft or published)
- Use Webflow MCP's `data_cms_tool` with action `update_collection_items` for updating items (draft or published)
- Use Webflow MCP's `data_cms_tool` with action `publish_collection_items` for publishing draft items
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Site & Collection Selection
1. **Get site**: Identify the target site. If user does not provide site ID, ask for it.
2. **List collections**: Use Webflow MCP's `data_cms_tool` with action `get_collection_list` to show available collections
3. **Ask user to select collection**: User specifies which collection to work with
4. **Fetch collection schema**: Use Webflow MCP's `data_cms_tool` with action `get_collection_details` to retrieve:
   - All field definitions with types
   - Required vs optional fields
   - Field validations (max length, patterns, etc.)
   - Reference field targets

### Phase 2: Data Collection & Parsing
5. **Ask operation type**: Clarify what user wants to do:
   - Create new items only
   - Update existing items only
   - Both create and update
6. **Receive data from user**: Accept data in flexible formats:
   - Structured format (JSON-like)
   - Natural language descriptions
   - CSV-style data
   - Bullet lists
7. **Parse and normalize**: Convert user data into structured format
8. **Fetch existing items** (if updates involved): Use Webflow MCP's `data_cms_tool` with action `list_collection_items` to get current data

   **IMPORTANT - Efficient Item Lookup:**
   - When searching for specific items by name, ALWAYS use the `name` parameter to filter (e.g., `name: "Pikachu"`)
   - When searching by slug, use the `slug` parameter to filter
   - NEVER fetch all items first and then search through the results - this wastes API calls and tokens
   - Only fetch the full list when you need to display all items or don't know which specific items to target

### Phase 3: Validation & Analysis
9. **Validate all data**:
   - **Field names**: Check all field names exist in schema
   - **Required fields**: Ensure all required fields are provided
   - **Field types**: Validate data types match schema
   - **Constraints**: Check max lengths, patterns, allowed values
   - **Slugs**: Ensure slugs are unique and valid
   - **Reference fields**: Verify referenced items exist
10. **Detect conflicts**:
    - Duplicate slugs (within batch or with existing items)
    - Missing required fields
    - Invalid data types
    - Constraint violations
11. **Analyze impact**:
    - Count creates vs updates
    - Identify which fields will change
    - Calculate batch size and processing time

### Phase 4: Preview & Granular Approval
12. **Generate detailed preview**:
    - Show each item with validation status
    - Display warnings for any issues
    - For updates, show diffs (old → new)
    - For creates, show all field values
    - Number each item for selective approval
13. **Present granular approval options**:
    - Allow user to select specific items to process
    - Options: "all", "none", specific numbers, number ranges
    - Show estimated processing time
14. **Offer publish options**:
    - Publish immediately (use `*_live` endpoints)
    - Create as drafts (use regular endpoints + manual publish)

### Phase 5: Execution & Reporting
15. **Store rollback data**: Before any changes, save:
    - Original values for all updated items
    - Timestamp
    - Operation details
16. **Process in batches**:
    - Maximum 50 items per batch
    - Show progress indicator
    - Handle rate limits gracefully
17. **Execute operations**: Use appropriate Webflow MCP tools based on user choice
18. **Handle errors gracefully**:
    - Continue processing on single item failures
    - Track successes and failures separately
    - Provide detailed error messages
19. **Generate comprehensive report**:
    - Summary (success/failure counts)
    - Detailed results per item
    - Item IDs for created/updated items
    - Error details for failed items
20. **Offer rollback option**: Allow user to undo changes if needed

## Examples

**User prompt:**
```
Add 2 blog posts about Webflow MCP and update the first blog to say "Top" instead of "Best"
```

**Step 1: Site & Collection Selection**
```
📋 Bulk CMS Update Setup

Available Sites:
1. MCP Demo#1
2. MCP Demo#2
3. MCP Demo#3

Please select a site (1-3):
```

*User selects: 1*

```
Available Collections in MCP Demo#1:
└── Blog Posts (9 items)
    Fields: name, slug, post-body, post-summary, main-image, thumbnail-image, featured, color

Proceed with Blog Posts collection? (yes/no)
```

*User confirms: yes*

**Step 2: Data Collection**
```
🔍 Collection Schema: Blog Posts

Required Fields:
- name (PlainText, max 256 chars)
- slug (PlainText, max 256 chars, alphanumeric only)

Optional Fields:
- post-body (RichText)
- post-summary (PlainText)
- main-image (Image)
- thumbnail-image (Image)
- featured (Switch, true/false)
- color (Color, hex format)

I'll parse your request:
- Create 2 new posts about Webflow MCP
- Update first post: "Best" → "Top"

Generating items...
```

**Step 3: Validation & Preview**
```
📋 Preview: Bulk CMS Update

Collection: Blog Posts
Operations: Create 2 items + Update 1 item

---

### 🆕 Items to Create (2)

[1] ✓ NEW POST
    name: "Webflow MCP: The Future of Web Development"
    slug: "webflow-mcp-future-web-development"
    post-summary: "Discover how Webflow MCP is revolutionizing..."
    post-body: "<h1>The Future is Here</h1><p>..."
    featured: true
    color: "#9B59B6"
    ✅ All validations passed

[2] ✓ NEW POST
    name: "Why Webflow MCP Will Transform Your Workflow in 2026"
    slug: "webflow-mcp-transform-workflow-2026"
    post-summary: "Learn how Webflow MCP's integration..."
    post-body: "<h1>Transform Your Workflow</h1><p>..."
    featured: true
    color: "#3498DB"
    ✅ All validations passed

---

### ✏️ Items to Update (1)

[3] ✓ UPDATE EXISTING
    Item ID: 69615f84fc6ce1aa444d24d5
    Slug: why-webflow-is-best-2026-ai

    Changes:
      name: "Why Webflow is the Best Choice for 2026" → "Why Webflow is the Top Choice for 2026"

    ✅ All validations passed

---

**Summary:**
- ✅ 2 items will be created
- ✅ 1 item will be updated
- ⚠️ 0 warnings
- ❌ 0 errors

**Publish Options:**
1. Publish immediately (recommended)
2. Save as drafts

Which items would you like to process?
- Type "all" to process all 3 items
- Type numbers to skip (e.g., "2" to skip item 2)
- Type "none" to cancel

Select publish option (1/2): _
Select items: _
```

*User selects: 1, all*

```
⚠️ You're about to:
- Create 2 new blog posts (published live)
- Update 1 existing blog post (changes published live)

Type "confirm" to proceed.
```

*User confirms: confirm*

**Step 4: Execution & Results**
```
🔄 Processing bulk update...

Creating items: ██████████ 100% (2/2)
Updating items: ██████████ 100% (1/1)

✅ Bulk CMS Update Complete!

---

### 🆕 Created Items (2)

✓ [1] "Webflow MCP: The Future of Web Development"
      ID: 6961640c66de07bed9aacf3e
      Slug: webflow-mcp-future-web-development
      Published: Jan 9, 2026, 8:24 PM

✓ [2] "Why Webflow MCP Will Transform Your Workflow in 2026"
      ID: 6961640c66de07bed9aacf41
      Slug: webflow-mcp-transform-workflow-2026
      Published: Jan 9, 2026, 8:24 PM

---

### ✏️ Updated Items (1)

✓ [3] "Why Webflow is the Top Choice for 2026"
      ID: 69615f84fc6ce1aa444d24d5
      Changed: title updated
      Published: Jan 9, 2026, 8:24 PM

---

**Summary:**
- ✅ 2 items created successfully
- ✅ 1 item updated successfully
- ❌ 0 failures
- ⏱️ Completed in 3.2 seconds

**Total Items:** 11 (was 9)

📋 Rollback Available:
Last update: 3 items modified just now
Type "undo" within 5 minutes to revert all changes
```

**Alternative: With Validation Warnings**
```
📋 Preview: Bulk CMS Update

[1] ⚠️ NEW POST
    name: "Test Post"
    slug: "test"
    post-summary: "Hi"
    ⚠️ Warning: post-summary too short (< 20 chars) - may affect SEO
    ⚠️ Warning: slug too generic - consider more descriptive slug
    ⚠️ Warning: missing post-body - content will be empty
    ✅ Required fields present (can proceed)

[2] ❌ NEW POST
    name: "Another Post!!!"
    slug: "another post"
    ❌ Error: slug contains spaces (must be alphanumeric with hyphens only)
    ❌ Error: name contains special characters not allowed
    🔴 Cannot proceed - fix errors first

---

**Summary:**
- ✅ 1 item can be created (with warnings)
- ❌ 1 item has errors (cannot create)

Fix item 2 or skip it? (fix/skip)
```

## Guidelines

### Phase 1: Critical Requirements

**Site & Collection Selection:**
- Always fetch actual site list using `data_sites_tool` with action `list_sites`
- Never assume site IDs
- Show collection names and item counts
- Display field schema before accepting data
- Confirm collection selection with user

### Phase 2: Data Parsing

**Flexible Input Formats:**
Accept data in multiple formats:

1. **Structured (JSON-like):**
```
CREATE:
- name: "Post Title"
  slug: "post-slug"
  featured: true
```

2. **Natural Language:**
```
"Add a blog post called 'Getting Started' with slug 'getting-started'"
```

3. **CSV-style:**
```
name,slug,featured
"Post 1","post-1",true
"Post 2","post-2",false
```

4. **Bullet Lists:**
```
- Post 1: "Title" (slug: title-slug)
- Post 2: "Another" (slug: another-slug)
```

**Parsing Rules:**
- Be lenient with format variations
- Infer missing optional fields
- Ask for clarification if ambiguous
- Never assume required field values

**Efficient Item Lookup:**
When fetching existing items for updates, use filter parameters to minimize API calls:

```
# Good - Filter by name when you know the item name
data_cms_tool(action: "list_collection_items", collection_id, name: "Pikachu")

# Good - Filter by slug when you know the slug
data_cms_tool(action: "list_collection_items", collection_id, slug: "pikachu")

# Bad - Fetching all items then searching through results
data_cms_tool(action: "list_collection_items", collection_id)  # Returns 100 items
# Then manually searching for "Pikachu" in results...
```

- ALWAYS use `name` or `slug` parameters when searching for specific items
- This reduces API calls, response size, and token usage
- Only fetch unfiltered lists when displaying all items or when the target is unknown

### Phase 3: Validation Rules

**Field Name Validation:**
- Check all field names exist in schema
- Case-sensitive matching
- Suggest corrections for typos
- Example: "autor" → Did you mean "author"?

**Required Fields:**
- `name` and `slug` are ALWAYS required for Webflow CMS
- Check collection-specific required fields from schema
- List all missing required fields clearly
- Cannot proceed if required fields missing

**Field Type Validation:**

**PlainText:**
- Check max length constraints
- Validate patterns if specified
- No HTML allowed

**RichText:**
- Must be valid HTML
- Check for unclosed tags
- Allow common HTML elements

**Image/File:**
- Accept file IDs or URLs
- Validate file exists (if possible)
- Optional alt text

**Switch (Boolean):**
- Accept: true/false, yes/no, 1/0
- Normalize to boolean

**Color:**
- Must be hex format (#RRGGBB)
- Validate hex characters
- Example: #FF5733 ✓, red ✗

**Reference Fields:**
- Must reference existing item IDs
- Validate referenced items exist
- Show referenced item names for clarity

**Slug Validation:**
- CRITICAL: Must be alphanumeric with hyphens only
- No spaces, underscores, or special characters
- Max 256 characters
- Must be unique (check against existing + batch)
- Auto-suggest slugs from titles if missing
- Example:
  - ❌ "My Post!" → ⚠️ Contains special characters
  - ✅ "my-post" → Valid

**Constraint Validation:**
- Max length: Warn if approaching limit, error if exceeds
- Patterns: Test regex patterns from schema
- Allowed values: Check against enumerated options

### Phase 4: Preview & Approval

**Preview Format:**

For **Create Operations:**
```
[1] ✓ NEW POST
    field1: "value1"
    field2: "value2"
    field3: "value3"
    ✅ All validations passed
```

For **Update Operations:**
```
[2] ✓ UPDATE EXISTING
    Item ID: xxx
    Slug: existing-slug

    Changes:
      field1: "old value" → "new value"
      field2: (no change)
      field3: "old" → "new"

    ✅ All validations passed
```

For **Items with Warnings:**
```
[3] ⚠️ NEW POST
    name: "Title"
    ⚠️ Warning: Missing optional field 'post-body'
    ⚠️ Warning: Slug may be too generic
    ✅ Can proceed (warnings only)
```

For **Items with Errors:**
```
[4] ❌ NEW POST
    name: "Title!!!"
    slug: "bad slug"
    ❌ Error: slug contains spaces
    ❌ Error: name has special characters
    🔴 Cannot proceed - must fix errors
```

**Granular Approval:**
- Number each item: [1], [2], [3]...
- Allow selective processing
- Accept formats:
  - "all" - process everything
  - "none" - cancel operation
  - "1,3,5" - process items 1, 3, and 5
  - "1-5" - process items 1 through 5
  - "2" - skip only item 2, process rest

**Publish Options:**
- Immediate publish: Use `*_live` endpoints (recommended)
- Draft mode: Use regular endpoints, publish later
- Explain implications of each choice

### Phase 5: Execution & Reporting

**Batch Processing:**
- Maximum 50 items per batch
- Show progress bar:
  ```
  Processing: ████████░░ 80% (40/50 items)
  ```
- Estimated time remaining
- Handle rate limits (pause/retry)

**Error Handling:**

**For Single Item Failures:**
```
Processing item 3/10...
❌ Failed: "Post Title"
   Error: Slug already exists
   → Skipping to next item
```

**Continue Processing:**
- Don't fail entire batch for one error
- Track all successes and failures
- Report both separately

**For Critical Failures:**
```
❌ Critical Error: API connection lost

Items processed before error: 7/50
- 5 created successfully
- 2 updated successfully
- 43 not processed

Retry failed items? (yes/no)
```

**Success Report Format:**
```
✅ Operation Complete

Created: 25 items
- Show first 5 with IDs
- "[+20 more]" if > 5

Updated: 10 items
- Show first 5 with IDs
- "[+5 more]" if > 5

Failed: 2 items
- "Item Name": Error reason
- "Item Name": Error reason

Total time: 12.5 seconds
Items per second: 2.8
```

**Rollback Capability:**

**Store Before Changes:**
```json
{
  "timestamp": "2026-01-09T20:24:44Z",
  "operations": [
    {
      "type": "update",
      "itemId": "xxx",
      "originalValues": {
        "name": "Old Title",
        "featured": false
      },
      "newValues": {
        "name": "New Title",
        "featured": true
      }
    }
  ]
}
```

**Offer Rollback:**
```
📋 Rollback Available:
Last update: 15 items modified 2 minutes ago

Rollback will:
- Restore 10 updated items to previous values
- Delete 5 newly created items

⚠️ Type "undo" to rollback all changes
⚠️ Rollback expires in 3 minutes
```

### Performance Optimization

**Batch Size:**
- Default: 50 items per batch
- Adjust based on field complexity
- Heavy images: 20 items per batch
- Simple text fields: 100 items per batch

**Progress Indicators:**
```
Creating items...
Batch 1/3: ████████████████████ 100% (50/50)
Batch 2/3: ████████████████████ 100% (50/50)
Batch 3/3: ██████░░░░░░░░░░░░░░ 30% (15/50)
```

**Rate Limiting:**
- Respect Webflow API rate limits
- Pause between batches if needed
- Show user why waiting
- Retry failed requests automatically (max 3 attempts)

### Error Messages

**Clear and Actionable:**

❌ **Bad:**
```
"Error: validation failed"
```

✅ **Good:**
```
"Validation Error on item 3:
 - Slug 'my post' contains spaces
 - Change to: 'my-post' (alphanumeric with hyphens only)"
```

**Error Categories:**
- 🔴 **Critical**: Cannot proceed at all (API down, invalid auth)
- ❌ **Error**: This item cannot be processed (fix or skip)
- ⚠️ **Warning**: Can proceed but not recommended (missing optional fields)
- 💡 **Suggestion**: Best practices (slug too generic, summary too short)

### Best Practices

**Always:**
- ✅ Show preview before any changes
- ✅ Require explicit confirmation
- ✅ Validate all data thoroughly
- ✅ Process in batches for large operations
- ✅ Report successes and failures separately
- ✅ Offer rollback for recent changes
- ✅ Use granular approval for flexibility

**Never:**
- ❌ Apply changes without user confirmation
- ❌ Fail entire batch for single item error
- ❌ Assume field names or values
- ❌ Process without validating first
- ❌ Hide validation warnings from user

**Edge Cases:**
- Duplicate slugs: Auto-append number (post-title-2)
- Missing optional fields: Leave empty (don't invent values)
- Large batches: Warn about processing time
- Reference fields: Validate targets exist
- Image fields: Accept URLs or file IDs

**User Experience:**
- Show collection schema upfront
- Number items for easy reference
- Use visual hierarchy (├── └──)
- Provide actionable error messages
- Estimate processing time
- Allow cancellation mid-process




<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 16/22: cms-best-practices -->
<!-- ═══════════════════════════════════════════════ -->

---
name: cms-best-practices
description: Expert guidance on Webflow CMS architecture and best practices. Use when planning collections, setting up relationships, optimizing content structure, or troubleshooting CMS issues.
---

# CMS Best Practices

Provide expert guidance on Webflow CMS architecture, relationships, optimization, and troubleshooting.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify available sites
- Use Webflow MCP's `data_sites_tool` with action `get_site` to retrieve site details and plan limits
- Use Webflow MCP's `data_cms_tool` with action `get_collection_list` to analyze existing collections
- Use Webflow MCP's `data_cms_tool` with action `get_collection_details` to examine collection schemas
- Use Webflow MCP's `data_cms_tool` with action `list_collection_items` to assess content volume
- Use Webflow MCP's `data_pages_tool` with action `list_pages` to understand page structure
- Use Webflow MCP's `ask_webflow_ai` for specific API questions
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Discovery & Analysis
1. **Identify the request**: Determine if user is:
   - Planning new CMS structure
   - Optimizing existing collections
   - Troubleshooting performance issues
   - Setting up relationships
   - Seeking architecture guidance
2. **Get site information**: Use Webflow MCP's `data_sites_tool` with actions `list_sites` and `get_site` to understand plan limits
3. **Analyze existing structure**: Use Webflow MCP's `data_cms_tool` with actions `get_collection_list` and `get_collection_details` to examine current setup
4. **Assess content volume**: Use Webflow MCP's `data_cms_tool` with action `list_collection_items` to understand scale
5. **Review pages**: Use Webflow MCP's `data_pages_tool` with action `list_pages` to see how content is displayed

### Phase 2: Requirements Gathering
6. **Understand use case**: Ask clarifying questions:
   - What content needs to be managed?
   - Who will update the content?
   - How will content be displayed?
   - What relationships are needed?
   - Expected content volume?
7. **Identify constraints**: Consider plan limits, technical constraints, team skills
8. **Define success criteria**: Performance goals, editorial workflow, scalability needs

### Phase 3: Architecture Planning
9. **Design collection structure**: Plan collections, fields, and relationships
10. **Select field types**: Choose appropriate field types for each content element
11. **Plan relationships**: Design one-to-many and many-to-many connections
12. **Consider taxonomy**: Determine categories, tags, and organizational structure
13. **Plan for scale**: Design for growth (pagination, performance, limits)
14. **Document decisions**: Explain tradeoffs and reasoning

### Phase 4: Recommendations & Validation
15. **Generate recommendations**: Provide specific, actionable guidance
16. **Prioritize changes**: Organize by impact (quick wins vs. long-term)
17. **Explain tradeoffs**: Help users understand limitations and workarounds
18. **Validate against best practices**: Check against Webflow limitations and patterns
19. **Provide alternatives**: Offer multiple approaches when applicable
20. **Create implementation roadmap**: Break down into phases

### Phase 5: Implementation Guidance
21. **Provide step-by-step instructions**: Clear guidance for implementation
22. **Offer to assist**: Suggest using other skills (cms-collection-setup, bulk-cms-update)
23. **Document structure**: Recommend documentation for team reference
24. **Suggest testing approach**: Guide on how to validate changes
25. **Plan for migration**: If refactoring, provide migration strategy

## Collection Architecture

### When to Use CMS vs Static

**Use CMS when:**
- Content updates frequently (weekly or more)
- Multiple similar items (blog posts, products, team members, projects)
- Non-technical users need to edit content
- Content needs filtering/sorting on the frontend
- Same content appears on multiple pages (author bios, product features)
- Content follows a consistent structure across items
- You need to dynamically generate pages

**Use Static when:**
- Content rarely changes (annual updates or less)
- Unique one-off sections (about page hero, homepage special features)
- Complex custom layouts per item that don't follow patterns
- No need for dynamic filtering or search
- Content is highly customized and doesn't share structure
- Performance is critical and content doesn't change
- You need complete design flexibility per section

**Hybrid Approach:**
- Static pages with CMS-driven sections (e.g., static homepage with CMS testimonials)
- CMS for recent content, static archives for old content
- Static landing pages, CMS for subpages

### Field Type Selection

| Content Type | Recommended Field | Notes | Character Limits |
|--------------|-------------------|-------|------------------|
| Short text | Plain Text | Titles, names, slugs | Max 256 chars |
| Long text (no formatting) | Plain Text (long) | Descriptions, excerpts | Unlimited |
| Formatted content | Rich Text | Blog content, bios, articles | Unlimited |
| Single image | Image | Photos, thumbnails, headers | 4MB max per image |
| Multiple images | Multi-image | Galleries, product photos | Up to 25 images |
| File downloads | File | PDFs, documents, downloads | 4MB max per file |
| Yes/No values | Switch | Featured flags, visibility toggles | Boolean |
| Single choice | Option | Status, type, category | Unlimited options |
| Date/time | Date/Time | Publish dates, events, deadlines | ISO 8601 format |
| Link to one item | Reference | Author → Post, Category → Post | One item |
| Link to multiple items | Multi-reference | Post → Tags, Post → Related Posts | Multiple items |
| External URL | Link | Social links, external resources | Max 2048 chars |
| Numeric values | Number | Prices, ratings, order, counts | Integer or decimal |
| Phone numbers | Phone | Contact numbers | E.164 format |
| Email addresses | Email | Contact emails | Valid email format |
| Color values | Color | Theme colors, accents, brand colors | Hex format |
| Video embeds | Video | YouTube, Vimeo embeds | Embed URL |

### Field Type Decision Tree

```
Need to store:
├── Text?
│   ├── Short (≤256 chars)? → Plain Text
│   ├── Long + Formatting? → Rich Text
│   └── Long + No Formatting? → Plain Text (long)
├── Media?
│   ├── Single image? → Image
│   ├── Multiple images? → Multi-image
│   ├── Video? → Video
│   └── File download? → File
├── Choice/Selection?
│   ├── Yes/No? → Switch
│   ├── One option? → Option
│   └── Link to item? → Reference/Multi-reference
├── Structured data?
│   ├── Number? → Number
│   ├── Date/Time? → Date/Time
│   ├── Phone? → Phone
│   ├── Email? → Email
│   └── URL? → Link
└── Visual?
    └── Color? → Color
```

## Relationship Patterns

### One-to-Many (Reference Field)

**Example:** Posts → Author
```
Authors Collection:
├── name (Text, required)
├── slug (Text, required)
├── bio (Rich Text)
├── photo (Image)
├── title (Text) - job title
├── email (Email)
└── social-links (Link)

Posts Collection:
├── title (Text, required)
├── slug (Text, required)
├── content (Rich Text)
└── author (Reference → Authors)  ← Each post has ONE author
```

**Display:** On post page, access `author.name`, `author.photo`, `author.bio`

**Filtering:** Can filter posts by specific author

**Advantages:**
- ✅ Centralized author data (update once, reflects everywhere)
- ✅ Easy to maintain consistency
- ✅ Can create author profile pages showing all their posts
- ✅ Efficient (one reference per post)

**Use cases:**
- Blog posts → Author
- Products → Brand
- Events → Venue
- Projects → Client
- Testimonials → Customer

### Many-to-Many (Multi-Reference)

**Example:** Posts ↔ Tags
```
Tags Collection:
├── name (Text, required)
├── slug (Text, required)
├── description (Plain Text)
└── color (Color) - optional visual grouping

Posts Collection:
├── title (Text, required)
├── slug (Text, required)
├── content (Rich Text)
└── tags (Multi-Reference → Tags)  ← Each post has MANY tags
```

**Display:** On post page, loop through `tags` to show all tags

**Filtering:** Can filter posts by specific tag

**Advantages:**
- ✅ Flexible content organization
- ✅ Cross-linking related content
- ✅ Better SEO (topic clustering)
- ✅ Enhanced user navigation

**Limitations:**
- ⚠️ Max 5 multi-reference fields per collection
- ⚠️ Can only filter by ONE multi-reference value at a time in collection lists
- ⚠️ Cannot sort by referenced field values
- ⚠️ Each reference = additional query (impacts performance)

**Workarounds for multiple tag filtering:**
1. Create combined tags (e.g., "vegan-gluten-free")
2. Use Finsweet CMS Filter for client-side filtering
3. Create separate filtered collection lists for common combinations
4. Use custom code with Webflow API

**Use cases:**
- Blog posts ↔ Tags
- Products ↔ Features
- Projects ↔ Technologies
- Recipes ↔ Ingredients
- Courses ↔ Topics

### Self-Reference (Nested Collections)

**Example:** Categories with subcategories
```
Categories Collection:
├── name (Text, required)
├── slug (Text, required)
├── description (Plain Text)
├── parent (Reference → Categories)  ← Self-reference for hierarchy
└── level (Number) - 1, 2, 3 for display logic
```

**Use cases:**
- Categories with subcategories
- Menu items with sub-menu items
- Organizational hierarchy
- Product taxonomy

**Advantages:**
- ✅ Flexible hierarchy
- ✅ Unlimited depth (theoretically)
- ✅ Easy to reorganize

**Limitations:**
- ⚠️ Complex to display nested levels in Webflow
- ⚠️ Max 2-3 levels recommended for practical implementation
- ⚠️ Requires custom logic for deep nesting

**Alternative:** Use Option field for simple 1-2 level categorization

### Bidirectional Relationships

**Example:** Related Posts
```
Posts Collection:
├── title (Text, required)
├── slug (Text, required)
├── content (Rich Text)
└── related-posts (Multi-Reference → Posts)  ← Self-reference to other posts
```

**Display:** Show related posts at bottom of post page

**Advantages:**
- ✅ Keeps users engaged longer
- ✅ Better SEO (internal linking)
- ✅ Flexible content connections

**Challenges:**
- ⚠️ Not truly bidirectional (A → B doesn't automatically create B → A)
- ⚠️ Must manually maintain both directions if needed
- ⚠️ Can be time-consuming for content editors

**Solutions:**
1. Use tags for automatic "related by tag" logic
2. Manual curation for most important connections
3. Hybrid: Manual + automated based on tags/category

## Examples

### Example 1: Planning New CMS Structure

**User prompt:**
```
I'm building a recipe site. How should I structure the CMS?
```

**Step 1: Requirements Gathering**
```
📐 CMS Planning: Recipe Site

Let me ask a few questions to design the best structure:

1. **Content Volume**: How many recipes do you plan to have?
   - Small (≤50): Simple structure
   - Medium (50-200): Moderate organization
   - Large (200+): Advanced taxonomy needed

2. **Recipe Attributes**: What information will each recipe have?
   - Basic: Name, ingredients, instructions, image
   - Advanced: Prep time, cook time, difficulty, nutrition, dietary tags

3. **Organization Needs**: How will users find recipes?
   - By meal type (breakfast, lunch, dinner)
   - By cuisine (Italian, Mexican, Asian)
   - By dietary restrictions (vegan, gluten-free, keto)
   - By cooking method (baking, grilling, slow cooker)
   - By ingredients (chicken, pasta, vegetables)

4. **Author Setup**: Single or multiple authors?
   - Single: You manage all content
   - Multiple: Team of recipe creators

5. **User Engagement**: What interactive features?
   - Comments/reviews
   - Ratings
   - Save favorites
   - Print recipe cards

Based on your answers, I'll design the optimal CMS architecture.
```

**Step 2: After User Responds**
```
📐 Recommended CMS Architecture: Recipe Site

Based on your requirements (Medium volume, Multiple authors, Advanced filtering):

---

## Collections Needed: 4

### 1. Recipes (Main Content)
├── name (Text, required) - "Homemade Pasta Carbonara"
├── slug (Text, required) - "homemade-pasta-carbonara"
├── description (Plain Text, 160 chars) - Brief summary for SEO
├── featured-image (Image) - Hero image for detail page
├── thumbnail-image (Image) - Smaller image for grid cards
├── prep-time (Number, required) - Minutes of prep
├── cook-time (Number, required) - Minutes of cooking
├── total-time (Number) - Auto-calculated or manual
├── servings (Number, required) - Number of servings
├── difficulty (Option: Easy, Medium, Hard)
├── ingredients (Rich Text, required) - Ingredient list with quantities
├── instructions (Rich Text, required) - Step-by-step directions
├── notes (Rich Text) - Cook's notes, tips, substitutions
├── nutrition-info (Plain Text) - Calories, protein, etc.
├── author (Reference → Authors, required)
├── category (Reference → Categories, required) - Primary meal type
├── cuisine (Reference → Cuisines) - Italian, Mexican, etc.
├── dietary-tags (Multi-Reference → Dietary Tags) - Vegan, GF, etc.
├── cooking-methods (Multi-Reference → Methods) - Baking, Grilling, etc.
├── featured (Switch) - Highlight on homepage
├── published-date (Date, required)
└── view-count (Number) - Track popularity

**Total fields:** 22 fields
**Plan required:** CMS plan minimum (20 collections, 2000 items)

### 2. Authors
├── name (Text, required)
├── slug (Text, required)
├── title (Text) - "Head Chef", "Recipe Developer"
├── bio (Rich Text)
├── photo (Image)
├── specialty (Plain Text) - "Italian Cuisine", "Baking"
├── social-instagram (Link)
├── social-website (Link)
└── email (Email)

**Purpose:** Reusable author information across all recipes

### 3. Categories
├── name (Text, required) - "Breakfast", "Lunch", "Dinner", "Desserts"
├── slug (Text, required)
├── description (Plain Text)
├── image (Image) - Category hero image
├── color (Color) - Brand color for UI
└── sort-order (Number) - Control display order

**Purpose:** Primary meal type classification

**Suggested Categories (8):**
- Breakfast & Brunch
- Appetizers & Snacks
- Lunch
- Dinner & Main Courses
- Side Dishes
- Salads
- Desserts & Sweets
- Drinks & Beverages

### 4. Cuisines
├── name (Text, required) - "Italian", "Mexican", "Asian"
├── slug (Text, required)
├── description (Plain Text)
└── flag-icon (Image) - Optional visual

**Purpose:** Filter by cuisine type

**Suggested Cuisines (12):**
- American, Italian, Mexican, Asian, Mediterranean, French, Indian, Thai,
  Chinese, Japanese, Greek, Middle Eastern

### 5. Dietary Tags
├── name (Text, required) - "Vegan", "Gluten-Free", "Keto"
├── slug (Text, required)
├── description (Plain Text)
├── icon (Image) - Badge icon
└── color (Color) - Badge color

**Purpose:** Multi-select dietary filters

**Suggested Tags (10):**
- Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Paleo, Low-Carb,
  High-Protein, Nut-Free, Pescatarian

### 6. Cooking Methods
├── name (Text, required) - "Baking", "Grilling", "Slow Cooker"
├── slug (Text, required)
└── description (Plain Text)

**Purpose:** Filter by cooking technique

**Suggested Methods (8):**
- Baking, Grilling, Slow Cooker, Instant Pot, Stovetop, No-Cook,
  Air Fryer, Sous Vide

---

## Relationship Map

```
Recipe → Author (one-to-many)
  ↓
Recipe → Category (one-to-many)
  ↓
Recipe → Cuisine (one-to-many)
  ↓
Recipe → Dietary Tags (many-to-many)
  ↓
Recipe → Cooking Methods (many-to-many)
```

**Multi-reference count:** 2 fields (within 5-field limit ✅)

---

## Recommended Page Structure

### 1. Homepage (/)
- Hero section with featured recipe
- Category cards (8 categories)
- Latest recipes (collection list, 6 items)
- Popular recipes (sorted by view-count)
- Call-to-action

### 2. Recipes Index (/recipes)
- Collection list showing all recipes
- Filter sidebar:
  - Category (tabs or dropdown)
  - Cuisine (multi-select)
  - Dietary tags (checkboxes)
  - Cooking time (< 30 min, 30-60 min, 60+ min)
  - Difficulty (easy, medium, hard)
- Pagination (12 recipes per page)
- Search bar (Finsweet CMS Filter)

### 3. Recipe Detail (/recipes/[slug])
- Hero image + title
- Prep/cook/total time + servings
- Difficulty badge + dietary badges
- Ingredients list
- Step-by-step instructions
- Author card with bio
- Related recipes (same category or tags)
- Print button

### 4. Category Pages (/category/[slug])
- Category hero image + description
- Filtered recipes by category
- Breadcrumbs: Home > Recipes > [Category]
- Related categories

### 5. Cuisine Pages (/cuisine/[slug])
- Cuisine description + flag
- Filtered recipes by cuisine
- Popular cuisines sidebar

### 6. Author Profiles (/authors/[slug])
- Author photo + bio
- Author's recipes (collection list)
- Social links
- Author stats (total recipes, join date)

### 7. Dietary Filter Pages (/diet/[slug])
- Dietary tag description
- Filtered recipes by tag
- Related dietary tags

---

## SEO Optimization

### Collection Template SEO
```
Recipe Detail Page (/recipes/[slug]):
- SEO Title: {{recipe.name}} | Your Site Name
- Meta Description: {{recipe.description}}
- OG Image: {{recipe.featured-image}}
- Schema: Recipe structured data (JSON-LD)
```

### Structured Data (Recipe Schema)
```json
{
  "@context": "https://schema.org/",
  "@type": "Recipe",
  "name": "{{recipe.name}}",
  "image": "{{recipe.featured-image}}",
  "author": {
    "@type": "Person",
    "name": "{{recipe.author.name}}"
  },
  "datePublished": "{{recipe.published-date}}",
  "description": "{{recipe.description}}",
  "prepTime": "PT{{recipe.prep-time}}M",
  "cookTime": "PT{{recipe.cook-time}}M",
  "totalTime": "PT{{recipe.total-time}}M",
  "recipeYield": "{{recipe.servings}} servings",
  "recipeIngredient": [...],
  "recipeInstructions": [...]
}
```

**Benefits:**
- Rich snippets in Google search
- Better CTR (images, ratings, cook time in results)
- Voice search optimization
- Better recipe discovery

---

## Performance Optimization

### For 50-200 Recipes:

**1. Pagination Strategy**
```
Recipes Index page:
- Limit: 12 recipes per page
- Enable Webflow pagination
- "Load More" button for smoother UX
```

**2. Image Optimization**
```
Thumbnail: 400x300px (grid cards)
Featured: 1200x800px (detail pages)
Format: WebP when possible
Loading: lazy for below-fold images
```

**3. Reference Field Strategy**
```
Display only needed fields:
- Author name + photo (don't bind entire author object)
- Category name + color (skip unused fields)
- Each reference = query, so minimize bindings
```

**4. Collection List Limits**
```
Homepage: 6 featured recipes
Category pages: 12 recipes per page
Author pages: 12 recipes per page
Related recipes: 3-4 max
```

---

## Content Strategy

### Phase 1: Foundation (Weeks 1-2)
- [ ] Create Authors (3-5 authors)
- [ ] Create Categories (8 categories)
- [ ] Create Cuisines (10-12 cuisines)
- [ ] Create Dietary Tags (8-10 tags)
- [ ] Create Cooking Methods (6-8 methods)

### Phase 2: Initial Content (Weeks 3-4)
- [ ] Add 20-30 flagship recipes
- [ ] Ensure even distribution across categories
- [ ] High-quality photos for all
- [ ] Complete metadata (all fields filled)

### Phase 3: Growth (Ongoing)
- [ ] Add 5-10 recipes per week
- [ ] Monitor popular recipes (view-count)
- [ ] Update seasonal recipes
- [ ] Maintain content quality

---

## Implementation Roadmap

### Week 1: Setup
- [ ] Create all 6 collections with fields
- [ ] Define relationships (references)
- [ ] Set required fields
- [ ] Add help text for editors

### Week 2: Content Structure
- [ ] Populate support collections (Authors, Categories, etc.)
- [ ] Create test recipes (3-5) with all fields
- [ ] Validate data structure

### Week 3: Pages
- [ ] Build homepage layout
- [ ] Create recipe index page with filters
- [ ] Design recipe detail template
- [ ] Build category/cuisine/author pages

### Week 4: Polish
- [ ] Implement SEO (titles, descriptions, schema)
- [ ] Add breadcrumbs and navigation
- [ ] Optimize images
- [ ] Test pagination and filters

### Week 5: Launch
- [ ] Add 20-30 initial recipes
- [ ] Final QA testing
- [ ] Publish site
- [ ] Monitor performance

---

## Quick Wins

### 1. Use View Count for "Popular Recipes"
- Add Number field: view-count
- Sort collection list by view-count (descending)
- Show "Most Popular" section on homepage

### 2. Auto-Calculate Total Time
- Option 1: Manual (editors enter prep + cook)
- Option 2: Display logic (show prep + cook sum in UI)
- Best for: Performance (no extra calculation)

### 3. Print-Friendly Recipe Cards
- Add "Print Recipe" button
- Use custom code to format for printing
- Include: Ingredients, Instructions, Image
- Exclude: Navigation, Ads, Comments

### 4. Related Recipes Logic
**Automatic (no manual curation):**
- Filter by same category
- Filter by shared dietary tags
- Sort by published-date (recent first)
- Limit to 3-4 recipes

---

Ready to implement? I can help you:
1. Create these collections using cms-collection-setup skill
2. Add initial content using bulk-cms-update skill
3. Build the page structure
4. Optimize for SEO and performance

Which would you like to start with?
```

### Example 2: Optimizing Existing CMS

**User prompt:**
```
My collection list is slow with 500+ items. How do I optimize?
```

**Response:**
```
⚡ CMS Performance Optimization

Analyzing your performance issue with 500+ items...

---

## Current Issue Diagnosis

**Problem:** Loading 500+ items on a single page
**Impact:**
- Slow page load (5-10 seconds or more)
- High bounce rate
- Poor SEO rankings
- Bad user experience
- Server stress

**Root Causes:**
1. Too many items loaded at once
2. Possibly too many reference field lookups
3. Large unoptimized images
4. No pagination or lazy loading
5. Complex nested collection lists

---

## Immediate Fixes (High Impact, Low Effort)

### 1. Implement Pagination ⚡ CRITICAL
**Current:** Loading all 500+ items
**Fix:** Limit to 12-20 items per page

**In Webflow Designer:**
1. Select your Collection List
2. Settings > Limit items: 20
3. Enable "Paginate items"
4. Style pagination controls

**Impact:** 95% faster page load ✅
**Time to implement:** 5 minutes
**Effort:** Low

### 2. Optimize Image Loading 🖼️
**Current:** Full-resolution images loading immediately
**Fix:** Use proper image sizes + lazy loading

**Implementation:**
```
Thumbnail images in grid:
- Size: 400x300px (not full resolution)
- Format: WebP (smaller file size)
- Loading: lazy (below fold images)

In Collection List Image settings:
- Set custom size: 400x300
- Enable lazy loading
- Use srcset for responsive images
```

**Impact:** 60-70% faster load ✅
**Time to implement:** 15 minutes
**Effort:** Low

### 3. Reduce Visible Reference Fields 🔗
**Current:** Binding all reference fields
**Fix:** Only display what you actually need

**Check your Collection List:**
```
❌ Bad: Binding entire author object
{
  author.name,
  author.bio,
  author.photo,
  author.email,
  author.social-links
}

✅ Good: Bind only displayed fields
{
  author.name,
  author.photo
}
```

**Why:** Each reference field = separate database query
**Impact:** 30-40% faster ✅
**Time to implement:** 10 minutes
**Effort:** Low

---

## Medium-Term Solutions (Moderate Impact, Moderate Effort)

### 4. Filter at Collection Level
**Current:** Loading all items, then hiding with conditional visibility
**Fix:** Use collection list filters

**Example:**
```
Instead of:
- Load all 500 posts
- Hide if published-date > today (conditional)

Do this:
- Collection List Filter: published-date ≤ today
- Only loads matching items
```

**Implementation:**
1. Collection List Settings
2. Add Filter: [field] [condition] [value]
3. Combine multiple filters with AND/OR

**Impact:** 50% faster + cleaner ✅
**Time to implement:** 30 minutes
**Effort:** Medium

### 5. Implement "Load More" Button
**Alternative to pagination:** Smoother UX

**Options:**
a) **Webflow native:** Pagination with "Load More" styling
b) **Finsweet:** CMS Load plugin (free)
c) **Custom code:** AJAX load more

**Benefits:**
- Users stay on same page (no page refresh)
- Better for mobile UX
- Smooth scrolling experience

**Impact:** Better UX, same performance as pagination ✅
**Time to implement:** 1-2 hours
**Effort:** Medium

### 6. Create Filtered Views
**Instead of:** One giant "All Posts" page
**Create:** Multiple filtered pages

**Example:**
```
/blog → Recent posts (20 items)
/blog/featured → Featured posts only (10 items)
/blog/category/tech → Tech category (filtered)
/blog/archive → Older posts with pagination
```

**Benefits:**
- Faster individual pages
- Better SEO (targeted pages)
- Easier navigation
- Reduced cognitive load

**Impact:** Significant UX improvement ✅
**Time to implement:** 2-3 hours
**Effort:** Medium

---

## Long-Term Solutions (High Impact, High Effort)

### 7. Archive Old Content
**Strategy:** Dynamic recent + static archives

**Implementation:**
```
Recent Content (Dynamic CMS):
- Last 50-100 posts
- Full dynamic filtering
- Fast performance

Older Content (Static):
- Archive pages for older posts
- Yearly/quarterly archives
- Still accessible but static HTML
- Rarely updated
```

**When to use:**
- 1000+ items
- Clear separation between recent/old content
- Archive content rarely accessed

**Impact:** Maintains fast performance at scale ✅
**Time to implement:** 1-2 weeks
**Effort:** High

### 8. Denormalize Data
**Problem:** Too many reference lookups
**Solution:** Copy frequently-accessed data

**Example:**
```
Current (Normalized):
Post → Author (reference)
Display: {{post.author.name}}
= 2 queries (post + author)

Denormalized:
Post has author-name field (text)
Display: {{post.author-name}}
= 1 query (just post)
```

**When to use:**
- Reference data rarely changes (author names)
- Performance is critical
- You can maintain consistency

**Tradeoff:** ⚠️ Must update in multiple places if data changes

**Impact:** 40-50% faster for reference-heavy pages ✅
**Time to implement:** Varies (requires data migration)
**Effort:** High

### 9. Implement Client-Side Filtering
**Use:** Finsweet CMS Filter (free)

**Benefits:**
- Load once, filter instantly
- No page refreshes
- Multiple simultaneous filters
- Search functionality
- Better UX

**Best for:**
- 100-500 items
- Users need advanced filtering
- Desktop-first audience

**Limitation:** All items loaded initially (use with pagination)

**Impact:** Instant filtering ✅
**Time to implement:** 2-4 hours
**Effort:** Medium-High

---

## Comprehensive Optimization Checklist

### Immediate Actions (Today):
- [ ] Limit collection list to 20 items
- [ ] Enable pagination
- [ ] Optimize image sizes (400x300 for thumbnails)
- [ ] Enable lazy loading on images
- [ ] Remove unused reference field bindings

### This Week:
- [ ] Add collection list filters (date, category)
- [ ] Create filtered category pages
- [ ] Test performance on mobile
- [ ] Implement "Load More" if desired
- [ ] Audit all collection lists on site

### This Month:
- [ ] Consider Finsweet CMS Filter for advanced filtering
- [ ] Create archive structure if >1000 items
- [ ] Optimize all images (WebP format)
- [ ] Review and optimize reference relationships
- [ ] Set up performance monitoring

---

## Performance Benchmarks

### Before Optimization:
- Load time: 8-12 seconds
- Items loaded: 500+
- Images: Full resolution
- References: All fields

### After Quick Fixes (Pagination + Images):
- Load time: 1-2 seconds ✅
- Items loaded: 20
- Images: Optimized thumbnails
- References: Only displayed fields

### After Full Optimization:
- Load time: <1 second ✅
- Lighthouse score: 90+ ✅
- Smooth pagination
- Instant client-side filtering

---

## Testing Your Changes

**Before deploying:**

1. **Test on staging:**
   - Publish to staging domain first
   - Verify pagination works
   - Check image quality
   - Test all filters

2. **Performance testing:**
   - Use Google PageSpeed Insights
   - Test on mobile (3G/4G)
   - Check Lighthouse scores
   - Verify Core Web Vitals

3. **User testing:**
   - Navigate through pages
   - Test search/filter
   - Check mobile experience
   - Verify no broken links

4. **Monitor after launch:**
   - Watch analytics (bounce rate, time on page)
   - Check error logs
   - Monitor load times
   - Gather user feedback

---

## Quick Implementation Priority

**Priority 1 (Do First):**
1. Pagination (20 items per page)
2. Optimize images (thumbnails)
3. Remove unused reference bindings

**Priority 2 (This Week):**
4. Add lazy loading
5. Create filtered views
6. Implement "Load More" option

**Priority 3 (If Needed):**
7. Finsweet CMS Filter
8. Archive old content
9. Denormalize critical data

---

Would you like me to walk you through implementing any of these optimizations? I can provide:
- Step-by-step Webflow Designer instructions
- Custom code snippets
- Testing checklist
- Performance monitoring setup

Let me know which optimization you'd like to tackle first!
```

### Example 3: Troubleshooting Relationships

**User prompt:**
```
My reference fields aren't showing up on the page. What's wrong?
```

**Response:**
```
🔍 Troubleshooting: Reference Fields Not Displaying

Let me help you diagnose and fix this issue.

---

## Common Causes & Solutions

### Issue 1: Reference Field Not Bound to Element
**Symptom:** Empty space where data should be
**Diagnosis:** Element exists but has no data binding

**Fix:**
1. Select the element (text, image, etc.)
2. Settings panel > Get text/image from [Collection Item]
3. Select your reference field
4. Choose the specific field to display

**Example:**
```
Element: Text Block
Binding: Blog Post > Author (reference) > Name

Correct path:
Collection Item > author > name
```

### Issue 2: Reference Field Has No Value
**Symptom:** Some items show data, others don't
**Diagnosis:** Not all collection items have the reference assigned

**Fix:**
1. Go to CMS Collections
2. Open your collection
3. Check items that aren't displaying
4. Ensure reference field is populated

**Prevention:**
- Make reference fields "Required" if critical
- Provide default/fallback content

### Issue 3: Wrong Collection Context
**Symptom:** Reference field not appearing in dropdown
**Diagnosis:** Element is outside collection list context

**Fix:**
```
❌ Wrong:
<div>
  <text>Author: {{author.name}}</text> ← No collection context
</div>

✅ Correct:
<Collection List - Posts>
  <Collection Item>
    <text>Author: {{author.name}}</text> ← Inside collection context
  </Collection Item>
</Collection List>
```

### Issue 4: Multi-Reference Display Error
**Symptom:** Only showing first item or nothing
**Diagnosis:** Multi-reference needs nested collection list

**Fix:**
```
For Multi-Reference field (Post → Tags):

❌ Wrong: Direct binding
<text>Tags: {{post.tags}}</text>

✅ Correct: Nested collection list
<Collection List - Posts>
  <Collection Item - Post>
    <Collection List - Get Items from Post > Tags>
      <Collection Item - Tag>
        <text>{{tag.name}}</text>
      </Collection Item>
    </Collection List>
  </Collection Item>
</Collection List>
```

### Issue 5: Deleted Referenced Item
**Symptom:** Reference field shows nothing despite being assigned
**Diagnosis:** Referenced item was deleted from other collection

**Fix:**
1. Go to referring collection
2. Check reference field assignments
3. Re-assign to existing items
4. Or recreate deleted item

**Prevention:**
- Be careful when deleting referenced items
- Check "Used in X items" before deleting
- Archive instead of delete if possible

### Issue 6: Collection Not Published
**Symptom:** Works in designer, not on live site
**Diagnosis:** Referenced collection items are drafts

**Fix:**
1. Go to referenced collection (e.g., Authors)
2. Find draft items
3. Publish them
4. Republish main site

**Check:**
```
CMS Collections > Authors
- Look for "Draft" badge
- Publish all needed items
- Items must be published to display via reference
```

---

## Step-by-Step Diagnostic

### Step 1: Verify Collection Structure
```
Check in CMS:
1. Does the reference field exist?
2. Is it configured correctly (Reference or Multi-Reference)?
3. Is it pointing to the right collection?
```

### Step 2: Verify Data Exists
```
Check collection items:
1. Open an item that should display
2. Check if reference field is populated
3. Verify referenced item exists and is published
```

### Step 3: Verify Page Structure
```
Check in Designer:
1. Is element inside Collection List?
2. Is Collection List connected to correct collection?
3. Is element binding correct path?
```

### Step 4: Test in Designer
```
In Designer:
1. Click Collection List
2. Set preview mode: "Item 1"
3. Cycle through items
4. Check if data appears

If it works in Designer but not live:
→ Publish issue (republish site)
```

---

## Testing Reference Fields

### Manual Test Checklist
- [ ] Create test item with reference populated
- [ ] Preview in Designer
- [ ] Check element binding path
- [ ] Publish and view live
- [ ] Verify all items display correctly
- [ ] Check items without references (should fail gracefully)

### Common Binding Patterns

**Single Reference (Author):**
```
Collection List: Posts
Collection Item: Post
Element: Text Block
Binding: Get text from Post > author > name
```

**Multi-Reference (Tags):**
```
Collection List: Posts
Collection Item: Post
  Nested Collection List: Get items from Post > tags
  Collection Item: Tag
    Element: Text Block
    Binding: Get text from Tag > name
```

**Self-Reference (Related Posts):**
```
Collection List: Posts
Collection Item: Post (current)
  Nested Collection List: Get items from Post > related-posts
  Collection Item: Post (related)
    Element: Text Block
    Binding: Get text from Post > title
```

---

## Prevention Tips

### Best Practices:
1. **Make critical references required**
   - Required: Yes for author, category
   - Optional: Yes for tags, related items

2. **Provide default content**
   - If reference is empty, show "Uncategorized"
   - Use conditional visibility for optional references

3. **Test with incomplete data**
   - Create test items with missing references
   - Ensure graceful fallback

4. **Document reference structure**
   - Create guide for content editors
   - Explain which fields are required
   - Show how to assign references

5. **Use descriptive field names**
   - ❌ "ref-1", "link"
   - ✅ "author", "primary-category", "related-posts"

---

## Quick Fixes by Symptom

| Symptom | Most Likely Cause | Quick Fix |
|---------|-------------------|-----------|
| Nothing shows | Not bound | Bind element to reference field |
| Some items empty | Reference not assigned | Assign reference in CMS |
| Works in designer, not live | Items not published | Publish referenced collection items |
| Only first tag shows | Using text binding on multi-ref | Use nested collection list |
| Shows random data | Wrong collection context | Check collection list nesting |
| Broken after deletion | Referenced item deleted | Re-assign or recreate item |

---

Would you like me to walk through your specific setup to diagnose the exact issue? I can:
- Review your collection structure
- Check your reference field configuration
- Analyze your page layout
- Test your data bindings
- Provide custom troubleshooting

Let me know what you'd like me to check!
```

## Guidelines

### Phase 1: Discovery Best Practices

**Always Start With:**
1. **Identify plan limits** - Use `data_sites_tool` with action `get_site` to check collection/item limits
2. **Analyze existing structure** - List collections before recommending changes
3. **Understand content volume** - Check item counts to assess scale
4. **Review current pages** - See how content is currently displayed
5. **Ask clarifying questions** - Don't assume requirements

**Plan Limits Reference:**
```
Starter Plan:
- Collections: 1
- Items per collection: 50
- CMS pages: 50

Basic Plan:
- Collections: 2
- Items total: 200
- CMS pages: 150

CMS Plan:
- Collections: 20
- Items total: 2,000
- CMS pages: 2,000

Business Plan:
- Collections: 40
- Items total: 10,000
- CMS pages: 10,000

Enterprise Plan:
- Custom limits
```

**Key Questions to Ask:**
1. "What content needs to be managed?" (identify collections)
2. "Who will update the content?" (determine complexity level)
3. "How will content be displayed?" (affects fields and relationships)
4. "What's the expected content volume?" (plan for scale)
5. "Are there any special requirements?" (unique features, integrations)

### Phase 2: Field Selection Best Practices

**Field Type Selection Matrix:**

**For Text Content:**
- **<50 characters:** Plain Text (single line)
- **50-256 characters:** Plain Text (multi-line)
- **Need formatting:** Rich Text
- **Pure data (no display):** Plain Text (validation enabled)

**For Relationships:**
- **One parent:** Reference (e.g., Post → Author)
- **Multiple parents:** Multi-Reference (e.g., Post → Tags)
- **Self-referencing:** Reference to same collection (e.g., Category → Parent Category)

**For Media:**
- **Hero images:** Image field (1 image)
- **Galleries:** Multi-image field (up to 25 images)
- **Documents:** File field (PDFs, docs)
- **Videos:** Video field (YouTube/Vimeo embeds)

**For Metadata:**
- **Dates:** Date/Time field
- **Numbers:** Number field (prices, counts, ratings)
- **Colors:** Color field (brand colors, theme colors)
- **Switches:** Boolean field (featured, published, active)

**Field Naming Conventions:**
```
✅ Good Names:
- published-date (descriptive, hyphenated)
- author (clear purpose)
- main-image (specifies which image)
- post-summary (explains use case)

❌ Bad Names:
- date1 (unclear which date)
- img (which image?)
- text (what kind of text?)
- field1 (no meaning)
```

**Required vs Optional:**
```
Make REQUIRED:
- name (unique identifier)
- slug (URL generation)
- primary relationships (author, category)
- publish date (for sorting)

Make OPTIONAL:
- tags (not always applicable)
- secondary images
- advanced metadata
- related items
```

### Phase 3: Relationship Design Best Practices

**One-to-Many Guidelines:**
```
Use when:
- Each item has exactly ONE parent
- Parent data is reused across many items
- You want centralized data management

Examples:
✅ Post → Author (each post has one author)
✅ Product → Brand (each product has one brand)
✅ Event → Venue (each event has one venue)

Don't use when:
❌ Item can have multiple parents (use multi-reference)
❌ Relationship is temporary (consider option field)
❌ Data is simple and rarely changes (use option field instead)
```

**Many-to-Many Guidelines:**
```
Use when:
- Items can have multiple relationships
- Relationships need to be managed separately
- You want flexible cross-linking

Examples:
✅ Post ↔ Tags (posts have many tags, tags apply to many posts)
✅ Product ↔ Features (products have many features, features apply to many products)
✅ Course ↔ Topics (courses cover many topics, topics span many courses)

Remember:
⚠️ Max 5 multi-reference fields per collection
⚠️ Can only filter by ONE multi-reference at a time
⚠️ Cannot sort by referenced field values
⚠️ Performance impact (more queries)
```

**Self-Reference Guidelines:**
```
Use when:
- Building hierarchies (categories, menu structure)
- Related items from same collection
- Organizational trees

Implementation:
- Add Reference field pointing to same collection
- Name it clearly: parent-category, related-posts
- Limit depth to 2-3 levels for practical display
- Consider adding "level" number field for easier filtering

Example Structure:
Categories:
├── Web Development (level 1, parent: null)
│   ├── Frontend (level 2, parent: Web Development)
│   └── Backend (level 2, parent: Web Development)
└── Design (level 1, parent: null)
```

### Phase 4: Architecture Patterns

**Common Collection Patterns:**

**1. Blog Architecture:**
```
Minimal (1 collection):
- Blog Posts

Standard (3 collections):
- Blog Posts
- Authors
- Categories

Advanced (5+ collections):
- Blog Posts
- Authors
- Categories
- Tags
- Topics/Series
```

**2. E-commerce Architecture:**
```
Minimal (1 collection):
- Products

Standard (4 collections):
- Products
- Categories
- Brands
- Features/Specifications

Advanced (7+ collections):
- Products
- Categories
- Brands
- Features
- Reviews
- Collections (curated product groups)
- Related Products
```

**3. Portfolio Architecture:**
```
Minimal (1 collection):
- Projects

Standard (3 collections):
- Projects
- Clients
- Services/Categories

Advanced (5+ collections):
- Projects
- Clients
- Services
- Team Members
- Technologies Used
```

**4. Directory Architecture:**
```
Minimal (1 collection):
- Listings

Standard (4 collections):
- Listings
- Categories
- Locations
- Owners/Managers

Advanced (6+ collections):
- Listings
- Categories
- Subcategories
- Locations (hierarchical)
- Amenities/Features
- Reviews/Ratings
```

### Phase 5: Performance Optimization

**Pagination Strategy:**
```
Content Volume → Items Per Page:
- 0-50 items: No pagination needed
- 50-100 items: 20 items per page
- 100-500 items: 15-20 items per page
- 500-1000 items: 12-15 items per page
- 1000+ items: 10-12 items per page + advanced filtering
```

**Image Optimization:**
```
Usage → Recommended Size:
- Thumbnail (grid cards): 400x300px
- Featured image (hero): 1200x800px
- Gallery images: 800x600px
- Background images: 1920x1080px

Format Priority:
1. WebP (best compression, modern browsers)
2. JPEG (photos, complex images)
3. PNG (transparency needed, simple graphics)
4. SVG (logos, icons, simple graphics)
```

**Reference Field Strategy:**
```
Optimization Levels:

Level 1 - Display Only What's Needed:
❌ Binding entire author object: {{author}}
✅ Binding specific fields: {{author.name}}, {{author.photo}}

Level 2 - Denormalize Critical Data:
Instead of: Post → Author.name (2 queries)
Store: Post.author-name (1 query)
When: Performance critical + data rarely changes

Level 3 - Lazy Load Related Content:
Show main content immediately
Load related items on interaction (click, scroll)
Reduces initial page load
```

**Collection List Optimization:**
```
Best Practices:

1. Filter at Collection Level:
   ✅ Use native collection list filters
   ❌ Load all items then hide with conditionals

2. Limit Items:
   ✅ Set reasonable limit (12-20 items)
   ❌ Load unlimited items

3. Optimize Nested Lists:
   ✅ Limit nested collection lists to 3-5 items
   ❌ Nest multiple unlimited lists

4. Use Conditional Loading:
   ✅ Load content based on viewport
   ❌ Load everything upfront

5. Implement Pagination:
   ✅ Enable Webflow pagination or "Load More"
   ❌ Infinite scroll with all items
```

### Phase 6: SEO Best Practices

**Collection Template SEO:**
```
Required Fields:
1. SEO Title (dynamic from item name)
2. Meta Description (dynamic from summary/description)
3. OG Image (dynamic from featured image)
4. Canonical URL (automatic)

Recommended:
5. Schema.org structured data (JSON-LD)
6. Open Graph tags (Facebook/LinkedIn)
7. Twitter Card tags
8. Alt text for all images
```

**Slug Best Practices:**
```
✅ Good Slugs:
- webflow-cms-best-practices
- ultimate-guide-to-seo
- 2026-web-design-trends

❌ Bad Slugs:
- Post1
- new-post-copy-3
- untitled-entry

Rules:
- Lowercase only
- Hyphens (not underscores)
- No special characters
- Descriptive (include keywords)
- Max 50-60 characters
```

**Structured Data Implementation:**
```
Common Types:

Blog Post (Article schema):
- headline, author, datePublished, image
- Use for: Blog posts, news articles

Product (Product schema):
- name, description, price, availability, image
- Use for: E-commerce products

Event (Event schema):
- name, startDate, location, organizer
- Use for: Events, webinars, conferences

Recipe (Recipe schema):
- name, ingredients, instructions, cookTime
- Use for: Recipe sites, food blogs

Local Business (LocalBusiness schema):
- name, address, phone, openingHours
- Use for: Directories, business listings
```

### Phase 7: Editorial Workflow

**Content Editor Guidelines:**

**Field Usage Documentation:**
```
Create guide for each collection:

Example - Blog Posts Collection:

1. Name* (required)
   - Post title
   - Keep under 60 characters for SEO
   - Make it catchy and descriptive

2. Slug* (required)
   - Auto-generated from name
   - Can be edited for SEO optimization
   - Use hyphens, lowercase only

3. Post Summary
   - Brief description (160 characters max)
   - Used for: Grid cards, meta description, social sharing
   - Make it compelling - this is what users see first

4. Featured Image*
   - Hero image for post
   - Minimum size: 1200x800px
   - Always add alt text for accessibility

5. Author*
   - Select from Authors list
   - Can't find author? Ask admin to create in Authors collection

... (document all fields)
```

**Required Field Checklist:**
```
Before Publishing:
□ Name filled
□ Slug set (no generic slugs like "untitled")
□ Summary written (compelling, 160 chars)
□ Featured image uploaded with alt text
□ Author assigned
□ Category selected
□ Published date set
□ Content proofread
□ Links tested
□ Images optimized
□ SEO reviewed
```

**Draft → Published Workflow:**
```
1. Create as Draft:
   - Fill required fields minimum
   - Save to preserve work

2. Complete Content:
   - Write/upload all content
   - Add images with alt text
   - Set metadata

3. Internal Review:
   - Proofread
   - Check formatting
   - Test links
   - Verify references

4. Publish:
   - Set published date
   - Change from draft to published
   - Verify on live site
   - Share/promote

5. Ongoing:
   - Update as needed
   - Monitor performance
   - Refresh outdated content
   - Archive if no longer relevant
```

### Phase 8: Migration Strategy

**When Refactoring Existing CMS:**

**Assessment Phase:**
```
1. Audit Current Structure:
   - List all collections
   - Count items per collection
   - Map relationships
   - Identify problems

2. Design New Structure:
   - Plan improvements
   - Design new collections
   - Define new relationships
   - Create migration plan

3. Validate Approach:
   - Test with sample data
   - Verify relationships work
   - Check performance
   - Get stakeholder approval
```

**Migration Approaches:**

**Approach 1: Parallel Build (Safest)**
```
1. Build new collections alongside old
2. Migrate content gradually
3. Test thoroughly
4. Switch pages to new collections
5. Archive old collections

Pros:
✅ No downtime
✅ Easy rollback
✅ Test before fully committing

Cons:
❌ Temporarily doubled content
❌ Longer timeline
❌ Must manage both systems temporarily
```

**Approach 2: Direct Migration (Faster)**
```
1. Create new collections
2. Export data from old collections
3. Transform data format
4. Import to new collections
5. Update pages to use new collections
6. Delete old collections

Pros:
✅ Faster completion
✅ Clean cutover
✅ No duplicate content

Cons:
❌ Higher risk
❌ Potential downtime
❌ Harder to rollback
```

**Approach 3: Hybrid (Recommended)**
```
1. Create new structure
2. Migrate in batches (50-100 items)
3. Test each batch
4. Update pages incrementally
5. Monitor for issues
6. Complete full migration

Pros:
✅ Balanced risk/speed
✅ Can catch issues early
✅ Incremental testing

Cons:
❌ Requires careful planning
❌ More complex execution
```

### Phase 9: Troubleshooting Common Issues

**Issue: "Collection won't save"**
```
Possible causes:
1. Required field empty
2. Slug conflict (duplicate)
3. Invalid characters in slug
4. Reference pointing to deleted item
5. Field validation failing

Diagnosis:
- Check for red highlighted fields
- Verify slug is unique
- Test without optional fields
- Check browser console for errors

Fix:
- Fill all required fields
- Change slug to be unique
- Remove special characters
- Re-assign references
- Contact Webflow support if persists
```

**Issue: "Reference field not showing options"**
```
Possible causes:
1. Referenced collection has no items
2. Referenced collection items not published
3. Wrong collection selected in reference settings
4. Browser cache issue

Fix:
1. Create items in referenced collection first
2. Publish all items in referenced collection
3. Double-check reference field configuration
4. Clear cache and refresh
```

**Issue: "Collection list showing wrong items"**
```
Possible causes:
1. Wrong collection selected
2. Filters configured incorrectly
3. Limit set too low
4. Items not published
5. Wrong CMS locale selected

Diagnosis:
- Check collection list settings
- Review filter conditions
- Check item publish status
- Verify correct locale

Fix:
- Select correct collection
- Adjust or remove filters
- Increase limit
- Publish items
- Switch to correct locale
```

**Issue: "Pagination not working"**
```
Possible causes:
1. Pagination not enabled
2. Limit set equal to or greater than total items
3. JavaScript conflict
4. Custom code interfering

Fix:
1. Enable pagination in collection list settings
2. Set limit lower than total items (e.g., 20)
3. Test with all custom code disabled
4. Check for JavaScript errors in console
```

**Issue: "Multi-reference only showing first item"**
```
Cause: Wrong display method

Fix:
Must use nested collection list:
❌ Direct text binding
✅ Collection List > Get items from [field] > Collection Item > Display

Example:
<Collection List - Posts>
  <Collection Item - Post>
    Tags:
    <Collection List - Get items from Post > tags>
      <Collection Item - Tag>
        <Inline> {{tag.name}} </Inline>
      </Collection Item>
    </Collection List>
  </Collection Item>
</Collection List>
```

### Phase 10: Advanced Techniques

**Conditional Display Based on References:**
```
Use Case: Show different layouts based on category

Implementation:
1. Add conditional visibility to elements
2. Condition: Category = "Video Posts"
3. Show video player layout
4. Condition: Category = "Image Posts"
5. Show image gallery layout

Limitation: Can only check one value at a time
Alternative: Use option field with class name, apply class dynamically
```

**Scheduled Publishing:**
```
Implementation:
1. Add "Published Date" field (Date/Time)
2. In collection list settings:
   - Add filter: Published Date ≤ Current Date
3. Set future dates on items to schedule

Benefits:
- No plugins needed
- Native Webflow functionality
- Items auto-appear on set date

Limitation: Items exist but filtered, not truly unpublished
```

**Dynamic Sorting:**
```
Option 1: Manual Sort Order
- Add "Sort Order" number field
- Manually assign: 1, 2, 3, 4...
- Sort collection list by Sort Order (ascending)

Option 2: Auto Sort by Engagement
- Add "View Count" number field
- Increment on page view (requires custom code)
- Sort by View Count (descending) for "Popular" lists

Option 3: Date-Based Sorting
- Sort by Published Date (descending) for "Recent"
- Sort by Created Date for "Chronological"
- Combine with filters for "This Month's Top Posts"
```

**Multi-Lingual Content:**
```
Approach 1: Separate Collections per Language
- Blog Posts EN
- Blog Posts ES
- Blog Posts FR

Pros: Simple, native Webflow
Cons: Must duplicate structure, harder to maintain

Approach 2: Language Field + Filter
- Add "Language" option field (EN, ES, FR)
- Filter collection lists by language
- Use URL parameter or cookie for language switch

Pros: Single structure, easier to maintain
Cons: All content in one collection

Approach 3: Webflow Localization (CMS Plan+)
- Use Webflow's native localization
- Create secondary locales
- Translate CMS content per locale

Pros: Official solution, best SEO
Cons: Requires CMS plan+, setup complexity
```

**Search Functionality:**
```
Option 1: Native (Limited)
- Use filter inputs on collection lists
- Basic keyword matching only
- No fuzzy search or relevance ranking

Option 2: Finsweet CMS Filter (Free)
- Client-side search and filtering
- Works with existing collection lists
- Multiple simultaneous filters
- Requires JavaScript

Option 3: Algolia/Custom (Advanced)
- Server-side search with AI
- Typo-tolerance, synonyms
- Fast and scalable
- Requires integration, costs money

Recommendation:
- <100 items: Native or Finsweet
- 100-1000 items: Finsweet
- 1000+ items: Consider Algolia
```

## Production Checklist

Before launching CMS-driven site:

**Structure:**
- [ ] All collections created with proper field types
- [ ] Required fields set appropriately
- [ ] Help text added for content editors
- [ ] Relationships configured correctly
- [ ] Self-references working properly
- [ ] Validation rules set on text fields

**Content:**
- [ ] Test items created for all collections
- [ ] All reference fields populated in test items
- [ ] Images optimized (size, format, alt text)
- [ ] Slugs follow naming conventions
- [ ] Published dates set on items
- [ ] Draft items clearly marked

**Pages:**
- [ ] Collection lists limited appropriately (12-20 items)
- [ ] Pagination enabled on large lists
- [ ] Filters configured correctly
- [ ] Multi-reference fields use nested collection lists
- [ ] Conditional visibility works as expected
- [ ] Empty states handled gracefully

**SEO:**
- [ ] Collection template has SEO title binding
- [ ] Meta descriptions bound to summary fields
- [ ] OG images bound to featured images
- [ ] Structured data implemented (if applicable)
- [ ] Alt text present on all images
- [ ] Slugs are SEO-friendly

**Performance:**
- [ ] Images lazy loading enabled
- [ ] Only displayed reference fields bound
- [ ] Collection lists use filters (not conditional hiding)
- [ ] Pagination prevents loading too many items
- [ ] Performance tested on mobile
- [ ] Lighthouse score >80

**Documentation:**
- [ ] Field usage guide created for editors
- [ ] Collection structure documented
- [ ] Relationship map created
- [ ] Publishing workflow defined
- [ ] Troubleshooting guide available
- [ ] Contact for technical support identified

**Testing:**
- [ ] All collection lists display correctly
- [ ] Pagination works
- [ ] Filters work
- [ ] Search works (if implemented)
- [ ] Reference fields display data
- [ ] Multi-reference lists show all items
- [ ] Empty states handled
- [ ] Mobile experience tested
- [ ] Cross-browser tested
- [ ] Performance benchmarked

**Launch:**
- [ ] Content editors trained
- [ ] Editorial calendar established
- [ ] Publishing workflow in place
- [ ] Monitoring setup (analytics, errors)
- [ ] Backup strategy defined
- [ ] Support plan in place



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 17/22: cms-collection-setup -->
<!-- ═══════════════════════════════════════════════ -->

---
name: cms-collection-setup
description: Create a new CMS collection in Webflow with specified fields and relationships. Use when setting up blog posts, products, team members, portfolios, or other content types with custom fields.
---

# CMS Collection Setup

Create a new CMS collection with custom fields, relationships, and proper configuration.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify available sites
- Use Webflow MCP's `data_sites_tool` with action `get_site` to retrieve site details and plan limits
- Use Webflow MCP's `data_cms_tool` with action `get_collection_list` to check for naming conflicts
- Use Webflow MCP's `data_cms_tool` with action `create_collection` to create the collection
- Use Webflow MCP's `data_cms_tool` with action `create_collection_static_field` to create static fields
- Use Webflow MCP's `data_cms_tool` with action `create_collection_option_field` to create option fields
- Use Webflow MCP's `data_cms_tool` with action `create_collection_reference_field` to create reference/multi-reference fields
- Use Webflow MCP's `data_cms_tool` with action `get_collection_details` to verify collection was created correctly
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Site Selection & Discovery
1. **Get site information**: Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify target site
2. **Confirm site**: Ask user to select site if multiple available
3. **Check plan limits**: Use Webflow MCP's `data_sites_tool` with action `get_site` to verify collection limits
4. **List existing collections**: Use Webflow MCP's `data_cms_tool` with action `get_collection_list` to check for conflicts
5. **Validate naming**: Ensure new collection name doesn't conflict with existing

### Phase 2: Requirements Gathering
6. **Get collection details**: Ask user for:
   - Collection display name (e.g., "Blog Posts")
   - Singular name (e.g., "Blog Post")
   - Optional: Custom slug (default: auto-generated from display name)
7. **Get field definitions**: For each field, gather:
   - Field name (e.g., "Author Name", "Publish Date")
   - Field type (Text, Rich Text, Image, Option, Reference, etc.)
   - Required vs optional
   - Any validation rules or help text
8. **Identify relationships**: Determine if collection needs:
   - Reference fields (one-to-many relationships)
   - Multi-reference fields (many-to-many relationships)
   - Option fields (controlled vocabulary)

### Phase 3: Schema Validation & Planning
9. **Validate field types**: Check all field types are supported
10. **Check field limits**: Ensure within Webflow limits:
    - Max fields per collection: varies by plan
    - Max 5 multi-reference fields per collection
11. **Plan creation order**: Organize fields by dependency:
    - Create collections in order if references exist
    - Create referenced collections first
    - Create option fields before reference fields
12. **Generate preview**: Show complete schema with all fields

### Phase 4: User Approval
13. **Show complete preview**: Display:
    - Collection name and slug
    - All fields with types and properties
    - Any relationships to other collections
    - Plan limit verification
14. **Validate schema**: Check for common issues:
    - Missing required fields (name, slug always required)
    - Invalid field types
    - Reference to non-existent collections
    - Exceeding plan limits
15. **Request confirmation**: Wait for explicit "create" approval

### Phase 5: Collection Creation
16. **Create collection**: Use Webflow MCP's `data_cms_tool` with action `create_collection` with:
    - Display name
    - Singular name
    - Optional slug
17. **Capture collection ID**: Save for field creation
18. **Show progress**: Report collection created successfully

### Phase 6: Field Creation
19. **Create fields in order**: For each field:
    - Use appropriate creation tool based on type
    - Static fields: `data_cms_tool` with action `create_collection_static_field`
    - Option fields: `data_cms_tool` with action `create_collection_option_field`
    - Reference fields: `data_cms_tool` with action `create_collection_reference_field`
20. **Set field properties**:
    - Display name
    - Required flag
    - Help text (if provided)
    - Validation rules (if applicable)
21. **Show progress**: Report each field created
22. **Handle errors**: If field creation fails, report and continue

### Phase 7: Verification & Reporting
23. **Verify collection**: Use Webflow MCP's `data_cms_tool` with action `get_collection_details` to retrieve full schema
24. **Confirm all fields**: Check that all requested fields were created
25. **Generate report**: Show:
    - Collection ID
    - Collection name and slug
    - All fields created with IDs
    - Any failures or warnings
26. **Provide next steps**: Suggest:
    - Use bulk-cms-update to add initial items
    - Create collection pages in Designer
    - Set up relationships if applicable

## Field Type Reference

### Static Field Types

**PlainText** - Short text (max 256 chars) or long text
- Use for: Titles, names, descriptions, excerpts
- Properties: maxLength validation (256 for short)
- Example: "Title", "Author Name", "Excerpt"

**RichText** - Formatted text with HTML
- Use for: Blog content, bios, articles, long descriptions
- Properties: No length limit
- Example: "Post Content", "Bio", "Description"

**Email** - Email address
- Use for: Contact emails, author emails
- Properties: Email format validation
- Example: "Contact Email", "Author Email"

**Phone** - Phone number
- Use for: Contact numbers
- Properties: E.164 format
- Example: "Phone Number", "Mobile"

**Link** - External URL or internal link
- Use for: Website links, social media, external resources
- Properties: URL validation
- Example: "Website", "LinkedIn Profile"

**Number** - Numeric values
- Use for: Prices, ratings, counts, order numbers
- Properties: Integer or decimal
- Example: "Price", "Rating", "Order"

**Image** - Single image
- Use for: Featured images, photos, thumbnails
- Properties: Max 4MB per image
- Example: "Featured Image", "Photo", "Thumbnail"

**MultiImage** - Multiple images (up to 25)
- Use for: Galleries, product photos
- Properties: Max 25 images, 4MB each
- Example: "Gallery", "Product Photos"

**File** - File upload
- Use for: PDFs, documents, downloads
- Properties: Max 4MB per file
- Example: "Resume PDF", "Brochure", "Manual"

**Video** - Video embed (YouTube/Vimeo)
- Use for: Video content
- Properties: Embed URL
- Example: "Tutorial Video", "Demo"

**DateTime** - Date and/or time
- Use for: Publish dates, event dates, deadlines
- Properties: ISO 8601 format
- Example: "Publish Date", "Event Date"

**Switch** - Boolean (true/false)
- Use for: Featured flags, visibility toggles
- Properties: Boolean value
- Example: "Featured", "Published", "Active"

**Color** - Color value
- Use for: Theme colors, accents, brand colors
- Properties: Hex format
- Example: "Brand Color", "Accent Color"

### Option Field Type

**Option** - Single choice from predefined list
- Use for: Status, category, type, priority
- Properties: List of option names
- Example: "Status" (Draft, Review, Published)
- Creation: Use `data_cms_tool` with action `create_collection_option_field` with options array

**Example:**
```json
{
  "type": "Option",
  "displayName": "Status",
  "metadata": {
    "options": [
      {"name": "Draft"},
      {"name": "In Review"},
      {"name": "Published"}
    ]
  }
}
```

### Reference Field Types

**Reference** - Link to one item in another collection (one-to-many)
- Use for: Author → Post, Category → Post, Brand → Product
- Properties: Collection ID of referenced collection
- Example: "Author" (reference to Authors collection)
- Creation: Use `data_cms_tool` with action `create_collection_reference_field` with collectionId

**MultiReference** - Link to multiple items in another collection (many-to-many)
- Use for: Post → Tags, Product → Features, Project → Technologies
- Properties: Collection ID of referenced collection
- Limit: Max 5 multi-reference fields per collection
- Example: "Tags" (reference to Tags collection)
- Creation: Use `data_cms_tool` with action `create_collection_reference_field` with collectionId

**Reference Field Example:**
```json
{
  "type": "Reference",
  "displayName": "Author",
  "metadata": {
    "collectionId": "abc123..."
  }
}
```

**Multi-Reference Field Example:**
```json
{
  "type": "MultiReference",
  "displayName": "Tags",
  "metadata": {
    "collectionId": "xyz789..."
  }
}
```

## Examples

### Example 1: Simple Blog Collection

**User prompt:**
```
Create a Blog Posts collection with title, content, author, and publish date
```

**Step 1: Discovery**
```
🔍 CMS Collection Setup

Available sites:
1. Company Website
2. Blog Site

Which site? (1/2)
```

**Step 2: After User Selects Site**
```
📊 Existing Collections on Company Website:

Currently: 0 collections
Plan limit: 20 collections (CMS Plan)

✅ You have capacity to create new collections.

---

📋 Collection Requirements

Display Name: Blog Posts
Singular Name: Blog Post
Slug: blog-posts (auto-generated)

Fields to create:
1. Title - Text (required)
2. Content - Rich Text (required)
3. Author - Text
4. Publish Date - Date/Time (required)

Is this correct? (yes/no)
If you want to add/modify fields, describe the changes.
```

**Step 3: Preview**
```
📋 Preview: Create "Blog Posts" Collection

Collection:
├── Display Name: Blog Posts
├── Singular Name: Blog Post
├── Slug: blog-posts
└── Site: Company Website

Fields (6 total):
├── name (PlainText, required) ← Auto-created
├── slug (PlainText, required) ← Auto-created
├── title (PlainText, required)
├── content (RichText, required)
├── author (PlainText)
└── publish-date (DateTime, required)

✅ Validation Passed:
- Collection name available
- Within plan limits (0/20 collections)
- All field types valid
- No dependency issues

⚠️ Type "create" to proceed.
```

**Step 4: Creation**
```
🔄 Creating Collection...

✅ Collection created: Blog Posts (ID: 64f1a2b3...)

Adding fields...
├── ✅ title (PlainText)
├── ✅ content (RichText)
├── ✅ author (PlainText)
└── ✅ publish-date (DateTime)

Progress: ████████████████████ 100% (4/4 fields)

🎉 Collection Setup Complete!

Collection: Blog Posts
ID: 64f1a2b3...
Fields: 6 (2 auto-created + 4 custom)

---

💡 Next Steps:
1. Use bulk-cms-update to add initial blog posts
2. Create collection template page in Designer
3. Set up collection list page for blog index
4. Configure SEO settings for dynamic pages
```

### Example 2: Collection with Relationships

**User prompt:**
```
Create a Products collection with name, price, description, images, brand, and tags
```

**Step 1: After Initial Gathering**
```
📋 Collection Analysis

I see you want:
- Brand: This should be a reference field
- Tags: This should be a multi-reference field

This requires creating additional collections first:
1. Brands collection
2. Tags collection

Then we can create Products with references to them.

Would you like me to:
A) Create all three collections (Brands, Tags, Products)
B) Just create Products (you'll add relationships later)
C) Modify the requirements

Your choice? (A/B/C)
```

**Step 2: After User Selects "A"**
```
📋 Preview: Create 3 Collections

---

### 1. Brands Collection

Fields (4 total):
├── name (PlainText, required) ← Auto
├── slug (PlainText, required) ← Auto
├── logo (Image)
└── description (PlainText)

---

### 2. Tags Collection

Fields (3 total):
├── name (PlainText, required) ← Auto
├── slug (PlainText, required) ← Auto
└── color (Color)

---

### 3. Products Collection

Fields (9 total):
├── name (PlainText, required) ← Auto
├── slug (PlainText, required) ← Auto
├── price (Number, required)
├── description (RichText)
├── images (MultiImage)
├── brand (Reference → Brands)
└── tags (MultiReference → Tags)

---

Creation Order:
1. Brands (no dependencies)
2. Tags (no dependencies)
3. Products (references 1 & 2)

✅ Validation:
- All collections available
- Within plan limits (0/20 collections)
- Multi-reference limit: 1/5 ✅
- All dependencies resolvable

⚠️ Type "create" to proceed with all 3 collections.
```

**Step 3: Creation**
```
🔄 Creating Collections...

[1/3] Creating Brands...
✅ Brands collection created (ID: abc123...)
├── ✅ logo (Image)
└── ✅ description (PlainText)

[2/3] Creating Tags...
✅ Tags collection created (ID: def456...)
└── ✅ color (Color)

[3/3] Creating Products...
✅ Products collection created (ID: ghi789...)
├── ✅ price (Number)
├── ✅ description (RichText)
├── ✅ images (MultiImage)
├── ✅ brand (Reference → Brands)
└── ✅ tags (MultiReference → Tags)

Progress: ████████████████████ 100% (3/3 collections)

🎉 All Collections Created!

Summary:
├── Brands (ID: abc123...)
├── Tags (ID: def456...)
└── Products (ID: ghi789...)

---

💡 Next Steps:
1. Add brand items first (use bulk-cms-update)
2. Add tag items (use bulk-cms-update)
3. Then add products with brand/tag references
4. Create collection pages in Designer
```

### Example 3: Team Members with Option Field

**User prompt:**
```
Create a Team Members collection with name, role (dropdown: Designer, Developer, Manager), bio, photo, email
```

**Step 1: Preview**
```
📋 Preview: Create "Team Members" Collection

Collection:
├── Display Name: Team Members
├── Singular Name: Team Member
└── Slug: team-members

Fields (7 total):
├── name (PlainText, required) ← Auto
├── slug (PlainText, required) ← Auto
├── role (Option, required)
│   Options:
│   ├── Designer
│   ├── Developer
│   └── Manager
├── bio (RichText)
├── photo (Image)
└── email (Email)

✅ Validation Passed

⚠️ Type "create" to proceed.
```

**Step 2: Creation**
```
🔄 Creating Collection...

✅ Collection created: Team Members (ID: jkl012...)

Adding fields...
├── ✅ role (Option: 3 options)
├── ✅ bio (RichText)
├── ✅ photo (Image)
└── ✅ email (Email)

Progress: ████████████████████ 100% (4/4 fields)

🎉 Collection Setup Complete!

Collection: Team Members
Fields: 6 (2 auto + 4 custom)

Field Details:
- role: Option field with 3 choices
  • Designer
  • Developer
  • Manager

---

💡 Next Steps:
1. Add team member items
2. Create team page in Designer
3. Consider adding:
   - LinkedIn profile (Link field)
   - Years of experience (Number field)
   - Specializations (MultiReference to Skills collection)
```

### Example 4: Complex E-commerce Setup

**User prompt:**
```
Create an e-commerce setup with Products, Categories, Brands, and Features
```

**Step 1: Requirements Clarification**
```
📋 E-commerce Collection Planning

I'll create 4 collections:

1. **Categories** - Product categories
2. **Brands** - Product brands
3. **Features** - Product features (e.g., "Waterproof", "Wireless")
4. **Products** - Main product catalog

Relationships:
- Product → Category (Reference)
- Product → Brand (Reference)
- Product → Features (MultiReference)

Fields per collection:

**Categories:**
- Name, Slug (auto)
- Description
- Parent Category (self-reference for hierarchy)
- Icon

**Brands:**
- Name, Slug (auto)
- Logo
- Description

**Features:**
- Name, Slug (auto)
- Icon
- Description

**Products:**
- Name, Slug (auto)
- Price
- Sale Price
- Description
- Images (MultiImage)
- Category (Reference → Categories)
- Brand (Reference → Brands)
- Features (MultiReference → Features)
- In Stock (Switch)
- SKU (PlainText)

Is this structure good? (yes/modify/cancel)
```

**Step 2: Preview (User says "yes")**
```
📋 Preview: Create E-commerce Collections

---

### Collection 1: Categories

Fields (5 total):
├── name (PlainText, required)
├── slug (PlainText, required)
├── description (PlainText)
├── parent-category (Reference → Categories) ← Self-reference
└── icon (Image)

---

### Collection 2: Brands

Fields (4 total):
├── name (PlainText, required)
├── slug (PlainText, required)
├── logo (Image)
└── description (PlainText)

---

### Collection 3: Features

Fields (4 total):
├── name (PlainText, required)
├── slug (PlainText, required)
├── icon (Image)
└── description (PlainText)

---

### Collection 4: Products

Fields (12 total):
├── name (PlainText, required)
├── slug (PlainText, required)
├── price (Number, required)
├── sale-price (Number)
├── description (RichText)
├── images (MultiImage)
├── category (Reference → Categories)
├── brand (Reference → Brands)
├── features (MultiReference → Features)
├── in-stock (Switch)
└── sku (PlainText)

---

Creation Order:
1. Categories (self-reference OK)
2. Brands (no dependencies)
3. Features (no dependencies)
4. Products (references 1, 2, 3)

✅ Validation:
- Within plan limits (0/20 collections)
- Multi-reference count: 1/5 ✅
- All field types valid
- Self-reference supported

⚠️ Type "create" to proceed with all 4 collections.
```

**Step 3: Creation with Progress**
```
🔄 Creating E-commerce Collections...

[1/4] Creating Categories...
✅ Categories created (ID: aaa111...)
Progress: ████████░░░░░░░░░░░░ 25%

[2/4] Creating Brands...
✅ Brands created (ID: bbb222...)
Progress: ████████████░░░░░░░░ 50%

[3/4] Creating Features...
✅ Features created (ID: ccc333...)
Progress: ████████████████░░░░ 75%

[4/4] Creating Products...
✅ Products created (ID: ddd444...)
Progress: ████████████████████ 100%

---

🎉 E-commerce Setup Complete!

Collections Created (4):
├── Categories (ID: aaa111..., 5 fields)
├── Brands (ID: bbb222..., 4 fields)
├── Features (ID: ccc333..., 4 fields)
└── Products (ID: ddd444..., 12 fields)

Relationships Configured:
- Products → Categories (one-to-many)
- Products → Brands (one-to-many)
- Products → Features (many-to-many)
- Categories → Parent Category (self-reference)

---

💡 Recommended Content Order:
1. Add categories first (including parent relationships)
2. Add brands
3. Add features
4. Finally add products (with all references)

💡 Next Steps:
1. Use bulk-cms-update for initial data
2. Create product template page
3. Create product listing page with filters
4. Set up category landing pages
5. Configure e-commerce integration
```

## Guidelines

### Phase 1: Discovery Best Practices

**Site Selection:**
- Always use `data_sites_tool` with action `list_sites` to get available sites
- Never assume site ID
- Verify user has correct site selected

**Plan Limit Checking:**
```
Check limits before creation:
- Starter: 1 collection, 50 items
- Basic: 2 collections, 200 items
- CMS: 20 collections, 2,000 items
- Business: 40 collections, 10,000 items
- Enterprise: Custom

Warn user if approaching limits.
```

**Naming Conflict Prevention:**
- Check existing collection names
- Suggest alternative names if conflict
- Validate slug availability

### Phase 2: Requirements Gathering Best Practices

**Display Name vs Singular Name:**
```
Display Name: Plural form shown in CMS
Singular Name: Singular form for individual items

Examples:
- Display: "Blog Posts" → Singular: "Blog Post"
- Display: "Team Members" → Singular: "Team Member"
- Display: "Products" → Singular: "Product"
- Display: "Categories" → Singular: "Category"
```

**Field Naming Conventions:**
```
✅ Good names:
- author-name (descriptive, hyphenated)
- publish-date (clear purpose)
- featured-image (specifies which)
- main-content (explains use)

❌ Bad names:
- text1 (meaningless)
- field (too generic)
- data (unclear)
- img (which image?)
```

**Detecting Relationships:**
```
If user says:
"... with author" → Likely reference field
"... with tags" → Likely multi-reference field
"... with category" → Likely reference field
"... with related products" → Likely multi-reference field

Ask clarifying questions:
- Is [author] the same across items? → Reference
- Can items have multiple [tags]? → Multi-reference
- Do you have a [Categories] collection? → Check existence
```

### Phase 3: Schema Validation Best Practices

**Field Type Validation:**
```
Common field type mappings:

User says... → Field type:
"title", "name" → PlainText
"description", "summary" → PlainText (long)
"content", "bio", "article" → RichText
"photo", "image", "thumbnail" → Image
"gallery", "photos" → MultiImage
"document", "PDF", "file" → File
"video" → Video
"link", "URL", "website" → Link
"email" → Email
"phone", "mobile" → Phone
"price", "cost", "amount" → Number
"date", "published", "deadline" → DateTime
"featured", "active", "published" → Switch
"status", "type", "category" → Option (if fixed choices)
"color", "theme" → Color
```

**Multi-Reference Limit Check:**
```
Count multi-reference fields requested:

If > 5:
⚠️ Warning: Collection Limit Exceeded

Webflow allows max 5 multi-reference fields per collection.

You requested: 7 multi-reference fields

Options:
1. Choose 5 most important relationships
2. Convert some to reference fields (one-to-many)
3. Create bridging collections
4. Use option fields for simple categorization

Which would you prefer?
```

**Dependency Resolution:**
```
For reference fields:
1. Check if referenced collection exists
2. If not, add to creation queue
3. Create in correct order

Example:
Products needs:
- Categories collection (create first)
- Brands collection (create first)
Then create Products
```

### Phase 4: Preview Best Practices

**Complete Preview Format:**
```
📋 Preview: Create "[Collection Name]"

Collection Details:
├── Display Name: [Name]
├── Singular Name: [Singular]
├── Slug: [slug]
└── Site: [Site Name]

Fields ([X] total):
├── name (PlainText, required) ← Auto-created
├── slug (PlainText, required) ← Auto-created
├── [field-1] ([Type], [required/optional])
├── [field-2] ([Type], [required/optional])
│   [Additional info if Option or Reference]
└── [field-n] ([Type], [required/optional])

Relationships:
├── [field] → [Collection] (Reference)
└── [field] → [Collection] (MultiReference)

✅ Validation Results:
- Collection name available: Yes
- Within plan limits: X/Y collections
- Multi-reference count: X/5
- All field types valid: Yes
- Dependencies resolved: Yes

⚠️ Type "create" to proceed.
```

**Validation Checks:**
```
Before showing preview:
1. ✅ Collection name available
2. ✅ Within plan collection limit
3. ✅ All field types supported
4. ✅ Multi-reference limit ≤ 5
5. ✅ Referenced collections exist or queued
6. ✅ No circular dependencies
7. ✅ Field names follow conventions
```

### Phase 5: Creation Best Practices

**Collection Creation:**
```
Required fields:
- displayName (required)
- singularName (required)
- slug (optional, auto-generated if omitted)

Always include both names for clarity:
✅ {"displayName": "Blog Posts", "singularName": "Blog Post"}
❌ {"displayName": "Blog Posts"} (missing singular)
```

**Error Handling:**
```
If collection creation fails:
❌ Collection Creation Failed

Error: [Error message from API]

Common causes:
- Collection name already exists
- Invalid characters in name/slug
- Plan limit reached
- API authentication issue

Would you like to:
1. Try a different collection name
2. Check existing collections
3. Upgrade plan
4. Cancel operation
```

### Phase 6: Field Creation Best Practices

**Field Creation Order:**
```
Create fields in this order:
1. Static fields (Text, Rich Text, Number, etc.)
2. Option fields (with options defined)
3. Reference fields (after referenced collections exist)

For each field:
- Set displayName
- Set isRequired flag
- Add helpText if provided by user
- Set validation rules if applicable
```

**Field Creation Tools:**
```
Field Type → Tool to use:

PlainText, RichText, Email, Phone, Link, Number,
Image, MultiImage, File, Video, DateTime, Switch, Color
→ data_cms_tool with action create_collection_static_field

Option
→ data_cms_tool with action create_collection_option_field
   (requires metadata.options array)

Reference, MultiReference
→ data_cms_tool with action create_collection_reference_field
   (requires metadata.collectionId)
```

**Progress Reporting:**
```
For each field created:
✅ [field-name] ([FieldType])

If field fails:
❌ [field-name] - [Error message]

Continue with remaining fields even if one fails.
Report all failures at end.
```

**Option Field Creation:**
```
{
  "type": "Option",
  "displayName": "Status",
  "isRequired": false,
  "metadata": {
    "options": [
      {"name": "Draft"},
      {"name": "Published"},
      {"name": "Archived"}
    ]
  }
}

Notes:
- Options have name property
- Options cannot have ID (auto-generated)
- Minimum 2 options required
- Maximum: unlimited
```

**Reference Field Creation:**
```
{
  "type": "Reference",
  "displayName": "Author",
  "isRequired": true,
  "metadata": {
    "collectionId": "abc123..."
  }
}

For MultiReference:
{
  "type": "MultiReference",
  "displayName": "Tags",
  "metadata": {
    "collectionId": "def456..."
  }
}

Notes:
- Must provide collectionId of referenced collection
- Referenced collection must already exist
- Max 5 MultiReference fields per collection
```

### Phase 7: Verification Best Practices

**Post-Creation Verification:**
```
After creating collection and fields:
1. Call data_cms_tool with action get_collection_details with collection ID
2. Verify all fields present
3. Check field properties match request
4. Confirm relationships configured correctly
```

**Final Report Format:**
```
🎉 Collection Setup Complete!

Collection: [Name]
ID: [collection-id]
Slug: [slug]

Fields Created ([X]):
├── name (PlainText, required) ← Auto
├── slug (PlainText, required) ← Auto
├── [field-1] ([Type])
├── [field-2] ([Type])
└── [field-n] ([Type])

[If relationships exist]
Relationships:
├── [field] → [Collection]
└── [field] → [Collection]

[If any failures]
⚠️ Failed Fields ([Y]):
├── [field]: [error]
└── [field]: [error]

---

💡 Next Steps:
[Relevant suggestions based on collection type]
```

**Next Steps Suggestions:**
```
For any collection:
1. Use bulk-cms-update to add initial items
2. Create collection template page in Designer
3. Create collection list page
4. Configure SEO settings

For collections with relationships:
5. Create referenced collections first
6. Add items in dependency order
7. Test relationship displays

For e-commerce:
5. Set up payment integration
6. Configure inventory management
7. Create checkout flow
```

### Phase 8: Error Handling

**Common Errors:**

**1. Collection Name Conflict:**
```
❌ Collection Already Exists

A collection named "Blog Posts" already exists on this site.

Existing collection:
- Name: Blog Posts
- ID: xyz789...
- Created: 2025-12-15

Would you like to:
1. Choose a different name
2. View existing collection
3. Add fields to existing collection
4. Cancel
```

**2. Plan Limit Reached:**
```
❌ Plan Limit Reached

Cannot create collection. You've reached your plan limit.

Current: 20/20 collections (CMS Plan)

Options:
1. Upgrade to Business Plan (40 collections)
2. Delete unused collections
3. Contact Webflow support

Would you like me to show your existing collections?
```

**3. Invalid Field Type:**
```
❌ Invalid Field Type

Field type "dropdown" is not supported by Webflow.

Did you mean:
- "Option" - Single choice from list
- "Reference" - Link to another collection
- "MultiReference" - Link to multiple items

Which would you like to use?
```

**4. Referenced Collection Not Found:**
```
❌ Referenced Collection Not Found

Cannot create reference field to "Authors" collection.

Issue: "Authors" collection doesn't exist yet.

Solutions:
1. Create "Authors" collection first
2. Remove reference field for now
3. Let me create both collections in order

Your choice? (1/2/3)
```

**5. Multi-Reference Limit Exceeded:**
```
❌ Too Many Multi-Reference Fields

You requested 6 multi-reference fields.
Webflow limit: 5 per collection

Requested:
1. Tags
2. Categories
3. Related Products
4. Features
5. Certifications
6. Compatible Products ← Exceeds limit

Choose 5 to keep, or convert one to Reference field.
```

### Phase 9: Advanced Scenarios

**Self-Referencing Collections:**
```
Example: Categories with parent categories

Collection: Categories
Fields:
├── name (PlainText, required)
├── slug (PlainText, required)
├── parent-category (Reference → Categories)
└── level (Number) - 1, 2, 3 for hierarchy

Implementation:
{
  "type": "Reference",
  "displayName": "Parent Category",
  "isRequired": false,
  "metadata": {
    "collectionId": "[same-collection-id]"
  }
}

Note: Must create collection first, then add self-reference field
```

**Multi-Collection Setup:**
```
When creating multiple related collections:

1. Identify dependencies:
   - Which collections reference others?
   - What's the creation order?

2. Create in order:
   - Independent collections first
   - Dependent collections after

3. Show overall progress:
   [1/4] Creating Categories...
   [2/4] Creating Brands...
   [3/4] Creating Tags...
   [4/4] Creating Products...

4. Report collectively:
   All 4 collections created successfully!
```

**Complex Option Fields:**
```
For complex dropdowns:

User: "Create status field with Draft, In Review, Approved, Published, Archived"

Option field with 5 choices:
{
  "type": "Option",
  "displayName": "Status",
  "isRequired": true,
  "metadata": {
    "options": [
      {"name": "Draft"},
      {"name": "In Review"},
      {"name": "Approved"},
      {"name": "Published"},
      {"name": "Archived"}
    ]
  }
}

Tip: Use workflow order for options
```

## Production Checklist

Before considering collection setup complete:

### ✅ Discovery
- [ ] Site selected and confirmed
- [ ] Plan limits checked
- [ ] Existing collections listed
- [ ] No naming conflicts
- [ ] User has appropriate permissions

### ✅ Requirements
- [ ] Display name gathered
- [ ] Singular name gathered
- [ ] All fields defined with types
- [ ] Required vs optional specified
- [ ] Relationships identified

### ✅ Validation
- [ ] All field types valid
- [ ] Multi-reference count ≤ 5
- [ ] Referenced collections exist or queued
- [ ] No circular dependencies
- [ ] Field names follow conventions
- [ ] Within plan limits

### ✅ Preview
- [ ] Complete schema shown
- [ ] All fields listed with properties
- [ ] Relationships displayed
- [ ] Validation results shown
- [ ] User confirmation obtained

### ✅ Creation
- [ ] Collection created successfully
- [ ] Collection ID captured
- [ ] All fields created
- [ ] Field creation errors handled
- [ ] Progress shown to user

### ✅ Verification
- [ ] Collection retrieved and verified
- [ ] All fields present
- [ ] Field properties correct
- [ ] Relationships configured
- [ ] Any errors reported

### ✅ Reporting
- [ ] Final summary provided
- [ ] Collection ID shared
- [ ] Fields listed
- [ ] Failures reported (if any)
- [ ] Next steps suggested

### ✅ Error Handling
- [ ] Collection conflicts handled
- [ ] Plan limits checked
- [ ] Invalid field types caught
- [ ] Missing references detected
- [ ] Partial failures reported



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 18/22: custom-code-management -->
<!-- ═══════════════════════════════════════════════ -->

---
name: custom-code-management
description: Add, review, or remove inline custom scripts on a Webflow site (up to 10,000 chars). Use for analytics, tracking pixels, chat widgets, or any custom JavaScript. Also manages page-level scripts.
---

# Custom Code Management

Add, review, and manage inline custom scripts on a Webflow site — analytics, tracking pixels, chat widgets, or any custom JavaScript.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `webflow_guide_tool` to get best practices **before any other tool call**
- Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify available sites
- Use Webflow MCP's `data_scripts_tool` with action `list_registered_scripts` to list all registered scripts
- Use Webflow MCP's `data_scripts_tool` with action `list_applied_scripts` to list scripts applied to pages
- Use Webflow MCP's `data_scripts_tool` with action `add_inline_site_script` to register a new inline script
- Use Webflow MCP's `data_scripts_tool` with action `delete_all_site_scripts` to remove ALL site scripts (no selective delete)
- Use Webflow MCP's `data_scripts_tool` with action `get_page_script` to get custom code for a specific page
- Use Webflow MCP's `data_scripts_tool` with action `upsert_page_script` to add or update page-level custom code
- Use Webflow MCP's `data_scripts_tool` with action `delete_all_page_scripts` to remove all custom code from a page
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Discovery
1. **Call `webflow_guide_tool` first** — always the first MCP tool call
2. **Get the site**: Use `data_sites_tool` with action `list_sites`. If only one site, use it automatically.

### Phase 2: Analysis
3. **List scripts**: Call `list_registered_scripts` and `list_applied_scripts` in parallel
4. **Check page-level scripts** (if relevant): Use `get_page_script` for specific pages
5. **Present findings**: Name, version, location (header/footer), registration vs application status

### Phase 3: Planning & Confirmation
Before any mutation, present the plan and require explicit confirmation:
- Adding scripts: user must type **"add"**
- Removing ALL site scripts: user must type **"delete all"** (warn: no selective delete)
- Page-level changes: user must type **"update"**

### Phase 4: Execution
6. **Add site script**: `add_inline_site_script` with displayName, sourceCode, version, location, canCopy
7. **Remove all site scripts**: `delete_all_site_scripts`
8. **Add/update page script**: `upsert_page_script`
9. **Remove page scripts**: `delete_all_page_scripts`

### Phase 5: Verification
10. Re-list scripts to confirm success
11. Report what changed (name, location, version, char count)
12. Remind user to publish — suggest using `safe-publish` skill

## Examples

### Example 1: View scripts
**User:** "What scripts are on my site?"
1. `webflow_guide_tool` → `data_sites_tool` → `list_registered_scripts` + `list_applied_scripts` in parallel
2. Present summary of all scripts

### Example 2: Add Google Tag Manager
**User:** "Add GTM to my site"
1. `webflow_guide_tool` → `data_sites_tool` → ask for GTM container ID
2. Preview script, require "add" → `add_inline_site_script` (header, version "1.0.0")
3. Verify and remind to publish

### Example 3: Remove all scripts
**User:** "Remove all scripts"
1. `webflow_guide_tool` → `data_sites_tool` → list current scripts
2. Warn: removes ALL scripts. Require "delete all" → `delete_all_site_scripts`
3. Verify and remind to publish

### Example 4: Page-specific tracking
**User:** "Add conversion tracking to my thank-you page"
1. `webflow_guide_tool` → `data_sites_tool` → `get_page_script` to check existing
2. Preview, require "update" → `upsert_page_script`
3. Verify and remind to publish

## Guidelines

- **`webflow_guide_tool` always first** — before any other MCP tool
- **No `<script>` tags** — Webflow adds them automatically
- **Max 10,000 characters** per script; `displayName` + `version` must be unique
- **Site-level** scripts (`add_inline_site_script`) apply to all pages; **page-level** scripts (`upsert_page_script`) apply to one page
- **No selective delete** — `delete_all_site_scripts` removes everything; always list scripts first so user knows what will be lost
- **Hosted/external scripts** not available via MCP — inline only
- Recommend **header** for analytics (GA, GTM); **footer** for chat widgets and non-critical scripts
- If `displayName + version` exists, suggest incrementing the version
- Always remind users to **publish** after changes



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 19/22: flowkit-naming -->
<!-- ═══════════════════════════════════════════════ -->

---
name: flowkit-naming
description: Apply Flowkit CSS naming system in Webflow. Use when creating classes, auditing existing naming, or building new components following Flowkit conventions. Flowkit is Webflow's official CSS framework with utility-first approach.
---

# Flowkit Naming System

Apply FlowKit CSS naming conventions in Webflow projects using Webflow Designer tools.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify the target site
- Use Webflow MCP's `de_page_tool` to get current page and switch pages
- Use Webflow MCP's `element_tool` to select elements and inspect current classes
- Use Webflow MCP's `style_tool` to create and update FlowKit-compliant styles
- Use Webflow MCP's `de_learn_more_about_styles` to understand supported style properties
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)
- **Designer connection required**: User must be connected to Webflow Designer for this skill to work

## Instructions

### Phase 1: Discovery & Setup
1. **Identify the task**: Determine if user is:
   - Creating new component classes
   - Auditing existing class names
   - Building complete page sections
   - Refactoring non-FlowKit classes to FlowKit
2. **Connect to Designer**: Confirm user has Webflow Designer open and connected
3. **Get current page**: Use Webflow MCP's `de_page_tool` to identify current working page
4. **Ask for scope**: Clarify which elements or sections to work with

### Phase 2: Analysis (if auditing existing)
5. **Get all elements**: Use Webflow MCP's `element_tool` to retrieve current page elements
6. **Extract classes**: Identify all class names currently applied
7. **Categorize issues**:
   - Missing `fk-` prefix
   - Incorrect case (uppercase/mixed case)
   - Wrong separators (underscores instead of hyphens)
   - Non-semantic naming
   - Inconsistent component structure
8. **Generate audit report**: Show current vs suggested FlowKit-compliant names

### Phase 3: Suggestion Generation
9. **Apply FlowKit patterns**: Generate class names following FlowKit v2 conventions
10. **Structure by type**:
    - Component wrappers: `fk-[component]`
    - Child elements: `fk-[component]-[element]`
    - State modifiers: combo classes with `is-[state]`
    - Layout utilities: `fk-flex`, `fk-grid`, `fk-stack`
    - Spacing utilities: `fk-space-[size]`, `fk-py-[size]`, `fk-px-[size]`
    - Typography utilities: `fk-text-[style]`
11. **Validate suggestions**: Ensure all suggestions follow FlowKit conventions
12. **Show preview**: Display hierarchical structure with suggested classes

### Phase 4: Application (if user confirms)
13. **Create styles**: Use Webflow MCP's `style_tool` to create new FlowKit-compliant class styles
14. **Update elements**: Use Webflow MCP's `element_tool` to apply classes to elements
15. **Process in batches**: If many elements, process in groups of 10-15
16. **Show progress**: Display which elements are being updated

### Phase 5: Verification & Reporting
17. **Verify application**: Check that classes were applied correctly
18. **Generate report**: Show what was created/updated
19. **Provide documentation**: Explain the FlowKit structure used
20. **Suggest next steps**: Recommend additional FlowKit patterns to implement

## FlowKit Naming Reference

### Core Naming Patterns

| Pattern | Purpose | Example |
|---------|---------|---------|
| `fk-[component]` | Component wrapper (base class) | `fk-card`, `fk-nav`, `fk-hero` |
| `fk-[component]-[element]` | Child element within component | `fk-card-title`, `fk-nav-link` |
| `fk-[component].[modifier]` | Combo class modifier (state/variant) | `fk-card.is-featured` |
| `fk-text-[style]` | Typography utility | `fk-text-xl`, `fk-text-bold` |
| `fk-flex` / `fk-grid` | Layout utilities | `fk-flex-center`, `fk-grid-3` |
| `fk-space-[size]` | Spacing utilities | `fk-space-md`, `fk-py-lg` |
| `is-[state]` | State modifiers (combo) | `is-active`, `is-hidden`, `is-disabled` |

### Layout Utilities

```
fk-section              Section wrapper with padding
fk-container            Max-width container (centered)
fk-flex                 Flexbox container
fk-flex-center          Centered flex (both axes)
fk-flex-between         Space-between flex
fk-flex-around          Space-around flex
fk-flex-col             Flex column direction
fk-grid                 Grid container (base)
fk-grid-2               2-column grid
fk-grid-3               3-column grid
fk-grid-4               4-column grid
fk-grid-6               6-column grid
fk-stack                Vertical stack (gap between items)
fk-row                  Horizontal row
fk-wrap                 Flex wrap enabled
```

### Typography Utilities

```
fk-text-xs              Extra small text (12px)
fk-text-sm              Small text (14px)
fk-text-md              Medium text (16px - default)
fk-text-lg              Large text (18px)
fk-text-xl              Extra large text (24px)
fk-text-2xl             2x large text (32px)
fk-text-3xl             3x large text (48px)
fk-text-bold            Bold weight (700)
fk-text-semibold        Semibold weight (600)
fk-text-medium          Medium weight (500)
fk-text-light           Light weight (300)
fk-text-center          Center aligned
fk-text-left            Left aligned
fk-text-right           Right aligned
fk-text-uppercase       Uppercase transform
fk-text-lowercase       Lowercase transform
fk-text-capitalize      Capitalize transform
```

### Spacing Utilities

```
fk-space-xs             4px spacing
fk-space-sm             8px spacing
fk-space-md             16px spacing (default)
fk-space-lg             24px spacing
fk-space-xl             32px spacing
fk-space-2xl            48px spacing
fk-space-3xl            64px spacing

Directional Spacing:
fk-py-[size]            Padding vertical (top + bottom)
fk-px-[size]            Padding horizontal (left + right)
fk-pt-[size]            Padding top
fk-pb-[size]            Padding bottom
fk-pl-[size]            Padding left
fk-pr-[size]            Padding right

fk-my-[size]            Margin vertical (top + bottom)
fk-mx-[size]            Margin horizontal (left + right)
fk-mt-[size]            Margin top
fk-mb-[size]            Margin bottom
fk-ml-[size]            Margin left
fk-mr-[size]            Margin right
```

### Color Utilities

```
fk-bg-primary           Primary background color
fk-bg-secondary         Secondary background color
fk-bg-accent            Accent background color
fk-bg-light             Light background
fk-bg-dark              Dark background
fk-text-primary         Primary text color
fk-text-secondary       Secondary text color
fk-text-muted           Muted text color
```

### Border & Visual Utilities

```
fk-rounded              Border radius (default)
fk-rounded-sm           Small border radius
fk-rounded-lg           Large border radius
fk-rounded-full         Fully rounded (pill/circle)
fk-border               Border (1px solid)
fk-border-top           Border top only
fk-border-bottom        Border bottom only
fk-shadow               Box shadow (default)
fk-shadow-sm            Small shadow
fk-shadow-lg            Large shadow
```

### State Modifiers (Combo Classes)

```
is-active               Active state (navigation, tabs)
is-hidden               Hidden visibility
is-visible              Visible visibility
is-disabled             Disabled state
is-loading              Loading state
is-error                Error state
is-success              Success state
is-primary              Primary variant
is-secondary            Secondary variant
is-featured             Featured/highlighted variant
is-horizontal           Horizontal layout variant
is-vertical             Vertical layout variant
```

## Examples

### Example 1: Creating Hero Section

**User prompt:**
```
Build a hero section with FlowKit naming
```

**Step 1: Analysis**
```
🎨 FlowKit Hero Section Structure

I'll create a hero section following FlowKit v2 conventions.

Structure:
fk-section (wrapper with padding)
└── fk-container (max-width container)
    └── fk-hero (component wrapper)
        ├── fk-hero-content + fk-flex + fk-flex-col + fk-flex-center
        │   ├── fk-hero-eyebrow + fk-text-sm + fk-text-uppercase + fk-mb-sm
        │   ├── fk-hero-title + fk-text-3xl + fk-text-bold + fk-mb-md
        │   ├── fk-hero-subtitle + fk-text-lg + fk-text-muted + fk-mb-lg
        │   └── fk-hero-actions + fk-flex + fk-space-md
        │       ├── fk-button.is-primary
        │       └── fk-button.is-secondary
        └── fk-hero-image + fk-rounded-lg

Total classes to create: 12 base classes + 2 combo classes
Ready to create these in Webflow Designer? (yes/no)
```

**Step 2: After user confirms**
```
🔄 Creating FlowKit Hero Classes...

Progress: ████████████████████ 100% (14/14 classes)

✅ Classes Created:

**Layout Classes:**
- ✅ fk-section - Section wrapper with padding
- ✅ fk-container - Max-width container
- ✅ fk-hero - Hero component wrapper

**Element Classes:**
- ✅ fk-hero-content - Hero content container
- ✅ fk-hero-eyebrow - Small label above title
- ✅ fk-hero-title - Main hero heading
- ✅ fk-hero-subtitle - Supporting text
- ✅ fk-hero-actions - Button container
- ✅ fk-hero-image - Hero image wrapper

**Utility Classes:**
- ✅ fk-flex, fk-flex-col, fk-flex-center
- ✅ fk-text-sm, fk-text-lg, fk-text-3xl
- ✅ fk-text-uppercase, fk-text-bold, fk-text-muted
- ✅ fk-mb-sm, fk-mb-md, fk-mb-lg
- ✅ fk-space-md, fk-rounded-lg

**Component Classes:**
- ✅ fk-button (with combo classes: is-primary, is-secondary)

---

📋 Usage Guide:

1. Create a Section element → Apply `fk-section`
2. Add Container inside → Apply `fk-container`
3. Add Div inside → Apply `fk-hero`
4. Build content structure following the hierarchy above
5. Use combo classes for button variants: `fk-button.is-primary`

🎉 Your FlowKit hero section structure is ready!
```

### Example 2: Auditing Existing Classes

**User prompt:**
```
Check these classes: feature-card, FK-Button, fk_hero_title, cardTitle
```

**Response:**
```
📋 FlowKit Audit Report

Checking 4 classes against FlowKit v2 conventions...

---

## Issues Found: 4

### 1. `feature-card` ⚠️
**Issue:** Missing FlowKit prefix
**Reason:** All FlowKit classes must start with `fk-`
**Suggested:** `fk-feature-card` or `fk-card.is-feature`
**Fix:** Rename class to include `fk-` prefix

### 2. `FK-Button` ❌
**Issue:** Incorrect case (uppercase)
**Reason:** FlowKit uses lowercase only
**Suggested:** `fk-button`
**Fix:** Convert to lowercase: `fk-button`

### 3. `fk_hero_title` ❌
**Issue:** Wrong separator (underscore)
**Reason:** FlowKit uses hyphens, not underscores
**Suggested:** `fk-hero-title`
**Fix:** Replace underscores with hyphens

### 4. `cardTitle` ❌
**Issue:** Multiple violations
  - Missing `fk-` prefix
  - CamelCase instead of kebab-case
**Reason:** FlowKit requires `fk-` prefix and hyphen separation
**Suggested:** `fk-card-title`
**Fix:** Add prefix and convert to kebab-case

---

## FlowKit Naming Rules:

✅ **Correct patterns:**
- `fk-card` (component)
- `fk-card-title` (element)
- `fk-button.is-primary` (with modifier)
- `fk-text-xl` (utility)

❌ **Incorrect patterns:**
- `card` (no prefix)
- `FK-Card` (wrong case)
- `fk_card` (wrong separator)
- `cardTitle` (camelCase)

Would you like me to rename these classes in Webflow Designer? (yes/no)
```

### Example 3: Building Card Component

**User prompt:**
```
Create a product card component with FlowKit classes
```

**Response:**
```
🎨 FlowKit Product Card Component

Structure:
fk-card (base component)
├── fk-card-image-wrapper
│   └── fk-card-image + fk-rounded-lg
├── fk-card-badge + fk-text-xs + fk-text-uppercase + fk-bg-accent
├── fk-card-content + fk-space-md
│   ├── fk-card-category + fk-text-sm + fk-text-muted
│   ├── fk-card-title + fk-text-lg + fk-text-bold
│   ├── fk-card-description + fk-text-md
│   └── fk-card-price + fk-text-xl + fk-text-bold + fk-text-primary
└── fk-card-footer + fk-flex + fk-flex-between + fk-pt-md + fk-border-top
    ├── fk-card-rating + fk-flex + fk-space-xs
    └── fk-button.is-primary + fk-text-sm

---

## Variants (Combo Classes):

### Featured Card
`fk-card.is-featured`
- Highlighted border/shadow
- Accent background
- Use for promoted products

### Horizontal Layout
`fk-card.is-horizontal`
- Side-by-side image/content
- Better for list views
- Image on left, content on right

### Compact Size
`fk-card.is-compact`
- Reduced padding
- Smaller text sizes
- Use in tight layouts

---

## Responsive Modifiers:

Desktop (default):
- `fk-grid-3` (3 cards per row)

Tablet:
- Add combo: `fk-grid-3.tablet-2`

Mobile:
- Add combo: `fk-grid-3.tablet-2.mobile-1`

---

Ready to create these classes? (yes/no)
```

### Example 4: Refactoring to FlowKit

**User prompt:**
```
Refactor my navigation to use FlowKit naming
```

**Step 1: Current Analysis**
```
🔍 Analyzing Current Navigation Classes...

Found 8 elements with non-FlowKit classes:
├── navbar → fk-nav
├── navbar-container → fk-nav-container
├── logo-wrapper → fk-nav-logo
├── menu → fk-nav-menu
├── menu-item → fk-nav-link
├── menu-item active → fk-nav-link.is-active
├── button-group → fk-nav-actions
└── btn-primary → fk-button.is-primary

---

## Migration Plan:

**Phase 1: Create FlowKit Classes** (8 classes)
- Create all `fk-nav-*` classes
- Create utility classes: `fk-flex`, `fk-flex-between`, `fk-flex-center`
- Create `fk-button` with `is-primary` modifier

**Phase 2: Update Elements** (8 elements)
- Replace old classes with new FlowKit classes
- Apply combo classes where needed
- Preserve existing styles

**Phase 3: Cleanup** (optional)
- Old classes can be removed after verification
- Keep for now to maintain backwards compatibility

---

Proceed with migration? (yes/no)
```

**Step 2: After Migration**
```
✅ Navigation Refactored to FlowKit

**Classes Created:** 8
**Elements Updated:** 8
**Time elapsed:** ~3 seconds

---

## Updated Structure:

fk-nav
├── fk-nav-container + fk-flex + fk-flex-between
│   ├── fk-nav-logo
│   ├── fk-nav-menu + fk-flex + fk-flex-center + fk-space-md
│   │   ├── fk-nav-link (x5)
│   │   └── fk-nav-link.is-active (current page)
│   └── fk-nav-actions + fk-flex + fk-space-sm
│       ├── fk-button.is-secondary
│       └── fk-button.is-primary

---

## Before → After:

| Old Class | New FlowKit Class |
|-----------|-------------------|
| navbar | fk-nav ✅ |
| navbar-container | fk-nav-container ✅ |
| logo-wrapper | fk-nav-logo ✅ |
| menu | fk-nav-menu ✅ |
| menu-item | fk-nav-link ✅ |
| menu-item active | fk-nav-link.is-active ✅ |
| button-group | fk-nav-actions ✅ |
| btn-primary | fk-button.is-primary ✅ |

---

🎉 Navigation is now FlowKit compliant!

**Next steps:**
- Test navigation on all breakpoints
- Verify active states work correctly
- Consider adding `fk-nav.is-transparent` for transparent header variant
- Consider adding `fk-nav.is-sticky` for sticky navigation
```

## Guidelines

### Phase 1: Critical Requirements

**FlowKit Prefix Rule:**
- ALL component and element classes MUST start with `fk-`
- Exception: State modifiers use `is-` prefix (as combo classes)
- Exception: Utility classes for third-party integrations may omit prefix

**Case Sensitivity:**
- All class names are lowercase only
- No uppercase letters anywhere
- No camelCase or PascalCase

**Separator Rule:**
- Use hyphens (`-`) to separate words
- Never use underscores (`_`)
- Never use spaces or special characters

**Naming Structure:**
```
Component:        fk-[component]
Element:          fk-[component]-[element]
Sub-element:      fk-[component]-[element]-[detail]
Utility:          fk-[property]-[value]
State modifier:   is-[state] (combo class only)
Responsive:       .[breakpoint]-[value] (combo class)
```

### Phase 2: Component Naming Rules

**Component Names:**
- Keep concise and semantic
- Use common web component terms: `card`, `nav`, `hero`, `footer`
- Avoid overly specific names: prefer `fk-card` over `fk-product-feature-card`
- Use modifiers for variants: `fk-card.is-featured` not `fk-card-featured`

**Element Hierarchy:**
- Parent component: `fk-card`
- Direct children: `fk-card-[element]` (e.g., `fk-card-title`)
- Deep nesting: Avoid more than 3 levels
- Bad: `fk-card-content-section-text-wrapper`
- Good: `fk-card-content`, `fk-card-text`

**Common Component Patterns:**

**Cards:**
```
fk-card
├── fk-card-image
├── fk-card-content
│   ├── fk-card-title
│   └── fk-card-text
└── fk-card-footer
```

**Navigation:**
```
fk-nav
├── fk-nav-logo
├── fk-nav-menu
│   └── fk-nav-link
└── fk-nav-actions
```

**Hero:**
```
fk-hero
├── fk-hero-content
│   ├── fk-hero-title
│   ├── fk-hero-subtitle
│   └── fk-hero-actions
└── fk-hero-media
```

**Forms:**
```
fk-form
├── fk-form-group
│   ├── fk-form-label
│   └── fk-form-input
└── fk-form-actions
```

### Phase 3: Utility Classes

**Utility Naming:**
- Format: `fk-[property]-[value]`
- Examples: `fk-text-lg`, `fk-space-md`, `fk-grid-3`

**Spacing Utilities:**
- Use t-shirt sizing: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- Directional: `py` (vertical), `px` (horizontal), `pt` (top), `pr` (right), `pb` (bottom), `pl` (left)
- Same for margins: `my`, `mx`, `mt`, `mr`, `mb`, `ml`

**Typography Utilities:**
- Size: `fk-text-[xs|sm|md|lg|xl|2xl|3xl]`
- Weight: `fk-text-[light|medium|semibold|bold]`
- Alignment: `fk-text-[left|center|right]`
- Transform: `fk-text-[uppercase|lowercase|capitalize]`

**Layout Utilities:**
- Flexbox: `fk-flex`, `fk-flex-col`, `fk-flex-center`, `fk-flex-between`
- Grid: `fk-grid`, `fk-grid-2`, `fk-grid-3`, `fk-grid-4`, `fk-grid-6`
- Container: `fk-container`, `fk-section`

### Phase 4: State Modifiers (Combo Classes)

**State Modifier Rules:**
- Always use as combo classes with `is-` prefix
- Applied in addition to base class
- Example: `<div class="fk-button is-primary">...</div>`

**Common States:**
```
is-active           Currently active/selected
is-disabled         Disabled interaction
is-hidden           Hidden visibility
is-visible          Visible (override hidden)
is-loading          Loading state
is-error            Error state
is-success          Success state
is-primary          Primary variant
is-secondary        Secondary variant
is-tertiary         Tertiary variant
is-featured         Featured/highlighted
is-horizontal       Horizontal layout
is-vertical         Vertical layout
is-expanded         Expanded state (accordions, dropdowns)
is-collapsed        Collapsed state
```

**Applying Combo Classes in Webflow:**
1. Select element
2. Add base class: `fk-button`
3. Add combo class: `is-primary`
4. Element has both classes: `fk-button is-primary`
5. Style the combo: `.fk-button.is-primary { ... }`

### Phase 5: Responsive Design

**Responsive Modifiers:**
- FlowKit uses combo classes for responsive behavior
- Format: `.[breakpoint]-[value]`
- Example: `fk-grid-4.tablet-2.mobile-1`

**Breakpoints:**
```
Desktop (default):   No modifier needed
Tablet:              .tablet-[value]
Mobile:              .mobile-[value]
```

**Responsive Grid Example:**
```
Base: fk-grid-4 (4 columns on desktop)
+ Combo: .tablet-2 (2 columns on tablet)
+ Combo: .mobile-1 (1 column on mobile)

Result: <div class="fk-grid-4 tablet-2 mobile-1">
```

**Responsive Text Example:**
```
Base: fk-text-3xl (48px on desktop)
+ Combo: .tablet-2xl (32px on tablet)
+ Combo: .mobile-xl (24px on mobile)

Result: <div class="fk-text-3xl tablet-2xl mobile-xl">
```

### Phase 6: Best Practices

**Always:**
- ✅ Use `fk-` prefix for all components and elements
- ✅ Use hyphens to separate words
- ✅ Use lowercase only
- ✅ Keep component names semantic and concise
- ✅ Use combo classes for modifiers and states
- ✅ Combine utilities freely (`fk-flex fk-flex-center fk-space-md`)
- ✅ Follow component-element hierarchy
- ✅ Use responsive combo classes for breakpoints

**Never:**
- ❌ Omit `fk-` prefix from components
- ❌ Use underscores or spaces
- ❌ Use uppercase or camelCase
- ❌ Create overly specific class names
- ❌ Nest elements more than 3 levels deep
- ❌ Mix FlowKit with other naming systems
- ❌ Create standalone modifier classes (use combo classes)

**Component vs Utility:**

Use **components** when:
- Building reusable UI patterns (cards, buttons, navigation)
- Need semantic meaning
- Multiple instances across site
- Example: `fk-card`, `fk-nav`, `fk-hero`

Use **utilities** when:
- Applying single-purpose styling (spacing, typography, layout)
- Quick adjustments without new classes
- Consistent spacing/sizing across site
- Example: `fk-text-lg`, `fk-space-md`, `fk-flex-center`

**Utility Stacking:**
Utilities can be freely combined:
```html
<div class="fk-flex fk-flex-center fk-space-md fk-py-lg">
  Content
</div>
```

**Component + Utility Combo:**
```html
<div class="fk-card fk-shadow-lg fk-rounded-lg">
  <div class="fk-card-content fk-space-lg">
    <h3 class="fk-card-title fk-text-xl fk-text-bold">Title</h3>
  </div>
</div>
```

### Phase 7: Common Mistakes & Fixes

**Mistake 1: Missing Prefix**
```
❌ card, button, nav
✅ fk-card, fk-button, fk-nav
```

**Mistake 2: Wrong Case**
```
❌ FK-Card, fk-Button, Fk-nav
✅ fk-card, fk-button, fk-nav
```

**Mistake 3: Wrong Separator**
```
❌ fk_card_title, fk.card.title
✅ fk-card-title
```

**Mistake 4: camelCase/PascalCase**
```
❌ fkCardTitle, FkCardTitle
✅ fk-card-title
```

**Mistake 5: Modifier as Standalone Class**
```
❌ <div class="fk-button-primary">
✅ <div class="fk-button is-primary">
```

**Mistake 6: Too Much Nesting**
```
❌ fk-hero-content-wrapper-section-title-text
✅ fk-hero-content, fk-hero-title
```

**Mistake 7: Overly Specific Names**
```
❌ fk-product-feature-card-with-image-and-price
✅ fk-card (use combo: is-product)
```

**Mistake 8: Wrong Responsive Pattern**
```
❌ fk-grid-3-tablet-2 (single class)
✅ fk-grid-3 tablet-2 (two classes)
```

### Phase 8: FlowKit Version Notes

**FlowKit v2 (Current):**
- New naming conventions (documented here)
- Enhanced grid system with responsive combos
- Expanded utility collection
- Improved component library
- Better variable system

**Key v2 Changes:**
- Standardized `fk-` prefix across all components
- Introduced `is-` prefix for state modifiers (combo classes)
- Added responsive combo classes (`.tablet-`, `.mobile-`)
- Expanded spacing scale (xs to 3xl)
- More semantic utility names

**Migration from v1:**
If user has v1 FlowKit classes:
1. Add `fk-` prefix where missing
2. Convert modifiers to `is-` combo classes
3. Update responsive classes to combo format
4. Check spacing utilities for new scale

### Phase 9: Performance Optimization

**Class Creation:**
- Create base component classes first
- Then create element classes
- Finally create utility classes
- Use `style_tool` in batches of 10-15 classes

**Element Updates:**
- Process elements in groups of 10-15
- Show progress for large batches
- If >50 elements, ask user to confirm batch size

**Designer Connection:**
- Always verify Designer connection before starting
- If connection lost, pause and ask user to reconnect
- Save progress between batches

### Phase 10: Error Handling

**Common Errors:**

**1. Designer Not Connected:**
```
❌ Error: Cannot create classes - Designer not connected

Solution:
1. Open Webflow Designer
2. Open the target site
3. Connect to Designer in Claude Code
4. Retry operation
```

**2. Class Already Exists:**
```
⚠️ Warning: Class 'fk-button' already exists

Options:
1. Skip creation (use existing)
2. Update existing class
3. Create with different name
```

**3. Invalid Class Name:**
```
❌ Error: Class name 'fk-My Button' is invalid

Issues:
- Contains spaces
- Contains uppercase

Suggested: 'fk-my-button'
```

**4. Style Property Not Supported:**
```
⚠️ Warning: Property 'custom-property' not supported

This may be:
- Custom CSS property
- Webflow doesn't support via Designer API
- Typo in property name

Recommendation: Apply manually in Designer
```

## Edge Cases

**Case 1: Third-Party Integration Classes**
If integrating with third-party libraries (e.g., animations, sliders):
- Keep third-party classes separate
- Add FlowKit wrapper: `<div class="fk-slider"><div class="swiper">...</div></div>`
- Don't force FlowKit naming on third-party classes

**Case 2: Legacy Code Migration**
When migrating large existing site:
- Create FlowKit classes first
- Apply to new sections
- Gradually refactor old sections
- Keep both systems temporarily for backwards compatibility

**Case 3: Custom Naming Requirements**
If client has existing naming system:
- Discuss FlowKit benefits
- Show side-by-side comparison
- Offer hybrid approach: FlowKit for new components, keep old for existing
- Or fully refactor (more time, better long-term)

**Case 4: Component Library Conflicts**
If site uses another framework (Bootstrap, Tailwind):
- FlowKit can coexist but not recommended
- Choose one primary system
- Use FlowKit for custom components
- Use other framework for pre-built components

**Case 5: Utility Class Explosion**
If too many utility classes on single element:
- Consider creating component class instead
- Example: Instead of `fk-flex fk-flex-center fk-space-md fk-py-lg fk-px-xl fk-rounded-lg fk-shadow`
- Create: `fk-panel` with those properties built-in

## Production Checklist

Before considering FlowKit implementation complete:

**Setup:**
- [ ] Webflow Designer connected
- [ ] Target site identified
- [ ] Current page confirmed
- [ ] Scope defined with user

**Component Structure:**
- [ ] All components use `fk-` prefix
- [ ] Component hierarchy is logical (max 3 levels)
- [ ] Element names are semantic
- [ ] Modifiers use combo classes with `is-` prefix

**Utilities:**
- [ ] Spacing utilities use t-shirt sizing (xs-3xl)
- [ ] Typography utilities cover all text styles
- [ ] Layout utilities handle flex/grid needs
- [ ] Color utilities align with brand

**Responsive:**
- [ ] Responsive combo classes defined for key components
- [ ] Breakpoint modifiers tested (tablet, mobile)
- [ ] Grid systems adapt properly

**States:**
- [ ] State modifiers defined (is-active, is-disabled, etc.)
- [ ] Hover/focus states work correctly
- [ ] Active states styled properly

**Documentation:**
- [ ] Component structure documented
- [ ] Utility classes listed
- [ ] Responsive behavior explained
- [ ] State modifiers documented

**Validation:**
- [ ] All classes follow naming conventions
- [ ] No uppercase letters
- [ ] No underscores
- [ ] All have proper prefixes

**Performance:**
- [ ] Classes created in batches
- [ ] Progress shown for large operations
- [ ] No duplicate classes created

**User Experience:**
- [ ] Clear feedback provided
- [ ] Progress indicators shown
- [ ] Success confirmation given
- [ ] Next steps recommended



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 20/22: link-checker -->
<!-- ═══════════════════════════════════════════════ -->

---
name: link-checker
description: Find and fix broken or insecure links across an entire site, including CMS content, to improve SEO and user experience. Audits HTTP/HTTPS issues and validates all internal and external links.
---

# Link Checker

Audit and fix broken or insecure links across your Webflow site to improve SEO and user experience.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify available sites
- Use Webflow MCP's `data_sites_tool` with action `get_site` to retrieve site details
- Use Webflow MCP's `data_pages_tool` with action `list_pages` to get all pages
- Use Webflow MCP's `data_pages_tool` with action `get_page_content` to extract links from static pages
- Use Webflow MCP's `data_pages_tool` with action `update_static_content` to fix links on static pages (requires Designer)
- Use Webflow MCP's `data_cms_tool` with action `get_collection_list` to get all CMS collections
- Use Webflow MCP's `data_cms_tool` with action `get_collection_details` to get collection schemas
- Use Webflow MCP's `data_cms_tool` with action `list_collection_items` to get CMS items with links
- Use Webflow MCP's `data_cms_tool` with action `update_collection_items` to fix links in CMS (draft)
- Use Webflow MCP's `data_cms_tool` with action `publish_collection_items` to publish fixed CMS items
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)
- **Designer connection required** for static page link fixes

## Instructions

### Phase 1: Site Selection & Discovery
1. **Get site information**: Use Webflow MCP's `data_sites_tool` with action `list_sites` to identify target site
2. **Confirm scope**: Ask user if they want to check:
   - Static pages only
   - CMS content only
   - Both static pages and CMS content
3. **List pages**: Use Webflow MCP's `data_pages_tool` with action `list_pages` to get all pages
4. **List collections**: Use Webflow MCP's `data_cms_tool` with action `get_collection_list` to get all CMS collections

### Phase 2: Link Extraction & Validation
5. **Extract links from static pages**: Use Webflow MCP's `data_pages_tool` with action `get_page_content` for each page
   - Identify all link elements (Link, Button, TextLink, LinkBlock)
   - Capture: pageId, nodeName, URL, link text
6. **Extract links from CMS**: Use Webflow MCP's `data_cms_tool` with action `list_collection_items` for each collection
   - Identify Link fields and Rich Text fields with links
   - Capture: collectionId, itemId, fieldName, URL
7. **Validate each link**: Test URL accessibility
   - Check for 4xx/5xx errors (broken links)
   - Check for HTTP vs HTTPS (insecure links)
   - Test if HTTP has HTTPS equivalent available
   - Flag redirects (3xx status codes)
8. **Categorize results**:
   - ✅ Working links (2xx status)
   - ❌ Broken links (4xx/5xx errors)
   - ⚠️ Insecure links (HTTP when HTTPS available)
   - 🔄 Redirects (3xx status)
   - ⚪ Manual review needed (timeouts, DNS errors, etc.)

### Phase 3: Analysis & Reporting
9. **Calculate statistics**:
   - Total links scanned
   - Links by type (internal vs external)
   - Links by status (working, broken, insecure, redirects)
   - Links by location (static pages vs CMS)
10. **Generate health score**: Calculate link health (0-100)
    - Working links: +1 point each
    - Broken links: -5 points each
    - Insecure links: -2 points each
    - Redirects: -1 point each
    - Normalize to 0-100 scale
11. **Identify critical issues**: Prioritize fixes
    - 🔴 Critical: Broken links on high-traffic pages
    - ⚠️ Warning: Insecure HTTP links
    - 💡 Suggestion: Optimize redirects

### Phase 4: Suggestion Generation & Approval
12. **Generate fix suggestions**: For each problematic link, suggest fix
    - Broken links: Remove link or update to correct URL
    - Insecure links: Upgrade HTTP to HTTPS
    - Redirects: Update to final destination URL
13. **Show preview with validation**:
    ```
    [1] ✓ Fix insecure link
        Page: About Us
        Element: Button "Learn More"
        Current: http://example.com
        Suggested: https://example.com
        ✅ HTTPS version verified working

    [2] ⚠️ Fix broken link
        Page: Blog Post "Getting Started"
        Element: Text link
        Current: https://oldsite.com/page
        Suggested: [REMOVE LINK or provide correct URL]
        ❌ URL returns 404 - manual review needed
    ```
14. **Implement granular approval**: Ask user which fixes to apply
    - Type numbers to skip (e.g., "2,4")
    - Type "all" to proceed with all automatic fixes
    - Type "none" to cancel
    - Flag manual review items separately

### Phase 5: Execution & Confirmation
15. **Apply fixes to static pages**: Use Webflow MCP's `data_pages_tool` with action `update_static_content`
    - Requires Designer connection
    - Update link URLs in nodes
    - Process in batches of 20 links
16. **Apply fixes to CMS content**: Use Webflow MCP's `data_cms_tool` with action `update_collection_items`
    - Update Link fields directly
    - Update links in Rich Text fields
    - Process in batches of 50 items
17. **Publish changes** (if requested): Use Webflow MCP's `data_cms_tool` with action `publish_collection_items`
18. **Show progress**: Display progress indicators for large operations
19. **Generate final report**:
    - Links scanned: X
    - Links fixed: Y
    - Links requiring manual review: Z
    - Health score improvement: Before → After

### Phase 6: Verification & Recommendations
20. **Verify fixes**: Re-check fixed links to confirm success
21. **Report failures**: Clearly identify any fixes that failed
22. **Provide recommendations**:
    - Schedule regular link checks (monthly/quarterly)
    - Set up monitoring for critical external links
    - Consider using 301 redirects for changed URLs
23. **Export report** (optional): Offer to export findings

## Examples

### Example 1: Complete Site Audit

**User prompt:**
```
Run a complete link check on my site and fix any issues
```

**Step 1: Site Selection**
```
🔍 Link Checker: Site Selection

Available sites:
1. Company Website
2. Blog Site
3. Portfolio

Which site would you like to audit? (1/2/3)
```

**Step 2: Scope Confirmation**
```
📋 Link Checker Scope

What would you like to check?
1. Static pages only (faster)
2. CMS content only
3. Both static pages and CMS content (comprehensive)

Recommendation: Option 3 for complete audit

Your choice? (1/2/3)
```

**Step 3: Extraction & Validation**
```
🔄 Scanning Links...

Progress: ████████████████████ 100%

Found 247 links:
├── Static pages: 89 links (15 pages)
├── CMS content: 158 links (3 collections)
│   ├── Blog Posts: 142 links
│   ├── Team Members: 12 links
│   └── Products: 4 links

Validating links...

Progress: ████████████████████ 100% (247/247 checked)

✅ Working: 215 links (87%)
❌ Broken: 8 links (3%)
⚠️ Insecure: 18 links (7%)
🔄 Redirects: 6 links (2%)
```

**Step 4: Analysis Report**
```
📊 Link Health Report: Company Website

Overall Health Score: 76/100 ⚠️

## Issues Found:

### 🔴 Critical: Broken Links (8)
├── [1] Page: "About Us"
│   └── Link to: https://partner-site.com/old-page
│       Status: 404 Not Found
│       Impact: High (homepage)
│
├── [2] CMS: Blog Post "Product Launch"
│   └── Link to: https://press-release.com/announcement
│       Status: 404 Not Found
│       Impact: Medium
│
├── [3-8] 6 more broken links...

### ⚠️ Warning: Insecure Links (18)
├── [9] Page: "Contact"
│   └── Link: http://social-media.com/company
│       Fix: https://social-media.com/company
│       ✅ HTTPS verified working
│
├── [10] CMS: Blog Post "Getting Started"
│   └── Link: http://tutorial-site.com
│       Fix: https://tutorial-site.com
│       ✅ HTTPS verified working
│
├── [11-26] 16 more insecure links...

### 💡 Suggestion: Redirects (6)
├── [27] Page: "Services"
│   └── Link: https://example.com/old-url
│       Redirects to: https://example.com/new-url
│       Suggestion: Update to final destination
│
├── [28-32] 5 more redirects...

---

💡 Recommendations:
1. Fix 8 broken links immediately (SEO impact)
2. Upgrade 18 HTTP links to HTTPS (security)
3. Update 6 redirects to final URLs (performance)

Estimated time to fix: ~5 minutes
```

**Step 5: Fix Preview**
```
🔧 Proposed Fixes (26 total)

### Automatic Fixes Available (24):

[1] ✓ Upgrade to HTTPS
    Page: Contact
    Element: Button "Follow Us"
    Current: http://social-media.com/company
    New: https://social-media.com/company
    ✅ HTTPS verified working

[2] ✓ Upgrade to HTTPS
    CMS: Blog Posts > "Getting Started" > content field
    Current: http://tutorial-site.com
    New: https://tutorial-site.com
    ✅ HTTPS verified working

[3] ✓ Update redirect
    Page: Services
    Element: Text link "Learn more"
    Current: https://example.com/old-url
    New: https://example.com/new-url
    ✅ Final destination verified

[4-24] ... 21 more automatic fixes

### Manual Review Required (2):

[25] ⚠️ Broken link - needs correction
    Page: About Us
    Element: Button "View Partner Site"
    Current: https://partner-site.com/old-page
    Issue: 404 Not Found
    Action needed: Provide correct URL or remove link

[26] ⚠️ Broken link - needs correction
    CMS: Blog Posts > "Product Launch" > content field
    Current: https://press-release.com/announcement
    Issue: 404 Not Found
    Action needed: Update with correct URL or remove

---

Which fixes would you like to apply?
- Type "all" to apply all 24 automatic fixes
- Type numbers to skip (e.g., "3,5,7")
- Type "none" to cancel
```

**Step 6: After User Approves "all"**
```
✅ Applying Fixes...

Progress: ████████████████████ 100%

Static Pages:
- Updated 8 links on 5 pages
- ✅ Contact page: 3 links fixed
- ✅ Services page: 2 links fixed
- ✅ About page: 1 link fixed
- ✅ Blog page: 2 links fixed

CMS Content:
- Updated 16 links in 12 items
- ✅ Blog Posts: 14 links fixed
- ✅ Team Members: 2 links fixed

---

🎉 Link Fixes Complete!

Summary:
- Links scanned: 247
- Links fixed: 24 ✅
- Manual review needed: 2 ⚠️
- Failed: 0 ❌

Health Score: 76 → 95 (+19) ✨

---

⚠️ Manual Review Items:

[1] About Us page - broken partner link
    Current: https://partner-site.com/old-page
    Action: Update or remove manually

[2] Blog post "Product Launch" - broken press release
    Current: https://press-release.com/announcement
    Action: Update or remove manually

---

💡 Next Steps:
1. Fix the 2 manual review items
2. Re-run link checker in 1 month
3. Set up monitoring for critical external links
4. Consider 301 redirects for any URL changes

Would you like to export this report? (yes/no)
```

### Example 2: CMS-Only Link Check

**User prompt:**
```
Check all links in my blog posts
```

**Step 1: Collection Selection**
```
🔍 Link Checker: CMS Collections

Found 3 collections:
1. Blog Posts (47 items)
2. Team Members (8 items)
3. Categories (6 items)

You requested blog posts. Checking "Blog Posts" collection...
```

**Step 2: Link Extraction**
```
🔄 Extracting Links from Blog Posts...

Progress: ████████████████████ 100% (47/47 items)

Found 142 links in Blog Posts:
├── Link fields: 23 links
├── Rich Text content: 119 links
└── Total unique URLs: 87 (55 appear multiple times)

Validating links...

Progress: ████████████████████ 100% (87/87 unique URLs checked)

Results:
✅ Working: 79 links (91%)
❌ Broken: 3 links (3%)
⚠️ Insecure: 5 links (6%)
🔄 Redirects: 0 links
```

**Step 3: Issue Report**
```
📊 Blog Posts Link Health: 91/100 ✅

## Issues Found:

### 🔴 Broken Links (3):
[1] Post: "Getting Started with Webflow"
    Field: content (Rich Text)
    Link: https://old-docs.example.com/guide
    Status: 404 Not Found
    Appears in: 3 posts

[2] Post: "Best Practices 2024"
    Field: external-link (Link)
    Link: https://expired-resource.com
    Status: 410 Gone

[3] Post: "Tutorial Series Part 3"
    Field: content (Rich Text)
    Link: https://video-host.com/deleted-video
    Status: 404 Not Found

### ⚠️ Insecure Links (5):
[4] Post: "Case Study: Company A"
    Field: content (Rich Text)
    Link: http://company-a-site.com
    Fix: https://company-a-site.com
    ✅ HTTPS available and working

[5-8] 4 more insecure links...

---

🔧 Proposed Fixes:

[1] ⚠️ Remove broken link (manual review)
    Posts affected: 3 (Getting Started, Tutorial 1, Tutorial 2)
    Link: https://old-docs.example.com/guide
    Suggestion: Update to new docs URL if available

[2] ⚠️ Remove broken link (manual review)
    Post: "Best Practices 2024"
    Link: https://expired-resource.com
    Suggestion: Remove or replace with alternative

[3] ⚠️ Remove broken link (manual review)
    Post: "Tutorial Series Part 3"
    Link: https://video-host.com/deleted-video
    Suggestion: Update with new video URL

[4] ✓ Upgrade to HTTPS
    Post: "Case Study: Company A"
    Current: http://company-a-site.com
    New: https://company-a-site.com
    ✅ HTTPS verified working

[5-8] ... 4 more HTTPS upgrades

---

Which fixes would you like to apply?
- Type "4-8" to apply only HTTPS upgrades
- Type "all" for all automatic fixes
- Type "none" to cancel
```

### Example 3: Static Pages Only (Quick Check)

**User prompt:**
```
Quick check on my static pages for broken links
```

**Response:**
```
🔍 Quick Link Check: Static Pages

Scanning 15 static pages...

Progress: ████████████████████ 100%

Found 89 links across 15 pages

Validation Results:
✅ All links working! (89/89)

Health Score: 100/100 ✨

Your static pages have no broken or insecure links.

💡 Tip: Run a full audit including CMS content for comprehensive coverage.
```

### Example 4: Fixing Specific Issues

**User prompt:**
```
I have some broken links on my About page. Can you fix them?
```

**Response:**
```
🔍 Checking Links on "About" Page...

Found 12 links on About page

Validation Results:
✅ Working: 9 links
❌ Broken: 2 links
⚠️ Insecure: 1 link

---

Issues Found:

[1] ❌ Broken: Partner site link
    Element: Button "Visit Partner"
    Link: https://partner-old-site.com
    Status: 404 Not Found
    Fix: Manual review needed

[2] ❌ Broken: Team member profile
    Element: Text link "Meet Sarah"
    Link: /team/sarah-old-profile
    Status: 404 Not Found
    Fix: Update to /team/sarah-johnson?

[3] ⚠️ Insecure: Social media link
    Element: Link "Follow us"
    Link: http://social.com/company
    Fix: https://social.com/company
    ✅ HTTPS verified

---

Which fixes would you like to apply?
- Type "3" to only fix the insecure link
- Type "2,3" to fix items 2 and 3
- Type "all" for automatic fixes
- Type "none" to cancel

Note: Item [1] requires manual correction with correct URL
```

## Guidelines

### Phase 1: Discovery Best Practices

**Site Selection:**
- Use `data_sites_tool` with action `list_sites` to get available sites
- Never assume site ID
- Confirm site name with user

**Scope Definition:**
- Ask if checking static pages, CMS, or both
- Estimate time based on scope:
  - Static pages only: 1-3 minutes
  - CMS only: 2-5 minutes (depends on item count)
  - Full site: 5-10 minutes

**Collection Selection:**
- List all collections with item counts
- If user specifies collection, focus on that
- If "all CMS", check all collections

### Phase 2: Link Extraction Best Practices

**Static Page Link Extraction:**
- Use `data_pages_tool` with action `get_page_content` to get page nodes
- Look for these node types:
  - Link (a tag)
  - Button (with link)
  - TextLink
  - LinkBlock
- Extract href/url property
- Capture link text for reporting
- Track nodeId for fixing later

**CMS Link Extraction:**
- Use `data_cms_tool` with action `get_collection_details` to identify Link and Rich Text fields
- Use `data_cms_tool` with action `list_collection_items` to get all items
- For Link fields: Extract URL directly
- For Rich Text fields: Parse HTML to extract <a> tags
- Track: collectionId, itemId, fieldName for fixing

**Link Validation:**
- Test each unique URL (avoid duplicate tests)
- Use HEAD request first (faster than GET)
- Fallback to GET if HEAD fails
- Handle timeouts (10 second max)
- For HTTP links: Test HTTPS equivalent
- Record status code and final URL (after redirects)

**Categorization Rules:**
```
✅ Working (2xx):
- 200 OK
- 201 Created
- 204 No Content

❌ Broken (4xx/5xx):
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 410 Gone
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

⚠️ Insecure (HTTP):
- URL starts with http://
- HTTPS equivalent exists and returns 2xx
- Mark as "upgrade to HTTPS"

🔄 Redirects (3xx):
- 301 Moved Permanently
- 302 Found
- 307 Temporary Redirect
- 308 Permanent Redirect

⚪ Manual Review:
- Timeout errors
- DNS resolution failures
- Connection refused
- SSL certificate errors
```

### Phase 3: Analysis Best Practices

**Health Score Calculation:**
```
Formula:
1. Base score = 100
2. Working links: No change
3. Broken links: -5 points each
4. Insecure links: -2 points each
5. Redirects: -1 point each
6. Minimum score: 0
7. Maximum score: 100

Example:
- Total links: 200
- Working: 180 (no penalty)
- Broken: 5 (−25 points)
- Insecure: 10 (−20 points)
- Redirects: 5 (−5 points)
- Score: 100 − 25 − 20 − 5 = 50/100
```

**Issue Prioritization:**
```
🔴 Critical (fix immediately):
- Broken links on homepage
- Broken links on high-traffic pages
- Broken links in navigation
- 404 errors on important external references

⚠️ Warning (fix soon):
- Insecure HTTP links (security risk)
- Broken links on blog posts
- Broken links in footer
- 410 Gone errors

💡 Suggestion (optimize):
- 301 redirects (update to final destination)
- 302 redirects (may change, monitor)
- External links with slow response times
```

**Statistics to Report:**
```
Essential:
- Total links scanned
- Working links count & percentage
- Broken links count & percentage
- Insecure links count & percentage
- Redirect links count & percentage

Detailed:
- Links by location (static vs CMS)
- Links by type (internal vs external)
- Most common issues
- Pages/items with most issues
- External domains with most broken links
```

### Phase 4: Suggestion Generation Best Practices

**Automatic Fix Criteria:**
```
Can auto-fix:
✅ HTTP → HTTPS (if HTTPS verified working)
✅ Redirects → Final destination (if final URL verified)
✅ Relative URLs → Absolute URLs (for external sites)

Needs manual review:
⚠️ Broken links (404, 410, 5xx) - requires correct URL
⚠️ HTTP with no HTTPS equivalent
⚠️ Timeouts or connection errors
⚠️ SSL certificate errors
⚠️ Authentication required (401, 403)
```

**Preview Format:**
```
[X] ✓ Auto-fix available
    Location: [Page name or CMS item]
    Element: [Element type + text]
    Current: [Current URL]
    New: [Proposed URL]
    ✅ Verification: [Status]

[Y] ⚠️ Manual review needed
    Location: [Page name or CMS item]
    Element: [Element type + text]
    Current: [Current URL]
    Issue: [Error description]
    Suggestion: [What to do]
```

**Granular Approval:**
- Number each fix starting from 1
- Show all automatic fixes first
- Show manual review items separately
- Allow user to select specific fixes
- Options: "all", "none", or specific numbers
- Example: "1,3,5-10" applies fixes 1, 3, and 5 through 10

### Phase 5: Execution Best Practices

**Static Page Updates:**
```
Requirements:
- Designer connection required
- Use data_pages_tool with action update_static_content
- Update nodes array with new URLs
- Process in batches of 20 links per page
- Verify updates after each batch

Error Handling:
- If Designer not connected: Report and skip static pages
- If update fails: Mark link and continue with others
- Report partial successes separately
```

**CMS Updates:**
```
For Link Fields:
- Direct update: fieldData[fieldName] = "new-url"
- Use data_cms_tool with action update_collection_items
- Option: update live or draft

For Rich Text Fields:
- Parse HTML content
- Find and replace <a> tags
- Preserve other HTML formatting
- Update fieldData[fieldName] with new HTML

Batch Processing:
- Process 50 items per batch
- Show progress for large collections
- Handle API rate limits gracefully
```

**Publishing:**
```
Ask user:
"Would you like to publish the changes immediately?"
- Yes: Use data_cms_tool with action publish_collection_items
- No: Leave as drafts

For static pages:
- Changes are immediate (Designer updates live)
- Warn user that static page changes are live
```

### Phase 6: Verification Best Practices

**Re-validation:**
- Re-check all fixed links
- Confirm status changed (404 → 200, HTTP → HTTPS)
- Report any fixes that didn't work
- Calculate new health score

**Failure Reporting:**
```
If any fixes failed:
❌ Fixes that failed (X):

[1] Failed to update
    Location: Contact page
    Reason: Designer connection lost
    Action: Reconnect Designer and retry

[2] URL still broken
    Location: Blog post "Guide"
    Reason: HTTPS version returned 404
    Action: Manual correction needed
```

**Success Reporting:**
```
✅ Summary:

Before:
- Health Score: 76/100
- Broken links: 8
- Insecure links: 18
- Redirects: 6

After:
- Health Score: 95/100 (+19)
- Broken links: 2 (6 fixed, 2 need manual review)
- Insecure links: 0 (18 fixed)
- Redirects: 0 (6 fixed)

Changes:
- Static pages: 8 links updated on 5 pages
- CMS content: 16 links updated in 12 items
- Total fixes: 24 ✅
- Manual review: 2 ⚠️
```

**Recommendations:**
```
Always provide:
1. Schedule for next check (monthly/quarterly)
2. Monitoring suggestions for critical links
3. Best practices for avoiding broken links
4. URL redirect strategies if applicable

Example:
💡 Recommendations:

1. **Schedule regular checks**
   - Run link checker monthly for active sites
   - Run quarterly for static sites
   - Set calendar reminder

2. **Monitor critical external links**
   - Key partners: company-a.com, partner-site.com
   - Documentation: docs.example.com
   - Social media profiles

3. **Set up URL redirects**
   - If changing URLs, create 301 redirects
   - Test redirects before going live
   - Keep redirect map updated

4. **Best practices**
   - Test external links before adding
   - Use relative URLs for internal links
   - Avoid deep linking to external pages
   - Verify links after major redesigns
```

### Phase 7: Export Options

**Report Formats:**
```
Offer to export findings:

1. **Markdown** - Human-readable report
   - Include all statistics
   - List all issues found
   - Show fixes applied
   - Add recommendations
   - Great for documentation

2. **CSV** - Spreadsheet format
   - Columns: Location, Element, URL, Status, Issue, Fix Applied
   - Easy to filter and analyze
   - Good for sharing with team

3. **JSON** - Machine-readable data
   - Complete raw data
   - Useful for integrations
   - Archive for historical tracking
```

**Export Example (Markdown):**
```markdown
# Link Audit Report: Company Website
Date: January 10, 2026

## Summary
- Total links scanned: 247
- Health score: 95/100
- Links fixed: 24
- Manual review needed: 2

## Issues Found
### Broken Links (8)
1. About Us > Button "Visit Partner"
   - URL: https://partner-old-site.com
   - Status: 404 Not Found
   - Fix: Manual review needed

...

## Recommendations
1. Schedule monthly link checks
2. Monitor key external links
3. Set up 301 redirects for URL changes
```

### Phase 8: Performance Optimization

**Batch Processing:**
```
For large sites:
- Process pages in batches of 10
- Process CMS items in batches of 50
- Show progress: "Processing batch 1 of 5..."
- Timeout protection: Skip after 30s per batch
```

**Caching Validation Results:**
```
- Cache validation results by unique URL
- If same URL appears 10 times, validate once
- Report: "Checking 87 unique URLs (out of 247 total links)"
- Reduces validation time significantly
```

**Parallel vs Sequential:**
```
Parallel (faster):
- Link validation (test multiple URLs simultaneously)
- Page content extraction (fetch multiple pages)

Sequential (required):
- Link updates (one at a time to avoid conflicts)
- Publishing (one batch at a time)
```

### Phase 9: Error Handling

**Common Errors:**

**1. Designer Not Connected:**
```
❌ Error: Cannot update static pages

Reason: Designer MCP app not connected

Solution:
1. Open Webflow Designer
2. Open the target site
3. Connect Designer MCP app
4. Retry static page fixes

Note: CMS fixes can proceed without Designer
```

**2. Rate Limits:**
```
⚠️ Warning: Rate limit reached

Pausing for 60 seconds...

Progress will resume automatically.
Current: 50/200 links validated
```

**3. Timeout Errors:**
```
⚠️ Link validation timeout

Link: https://very-slow-site.com
Timeout: 10 seconds exceeded

Marked for manual review.
Continuing with remaining links...
```

**4. SSL Certificate Errors:**
```
⚠️ SSL Certificate Error

Link: https://expired-cert-site.com
Issue: Certificate expired

Cannot verify HTTPS. Marked for manual review.
```

### Phase 10: Edge Cases

**Case 1: No Issues Found**
```
🎉 Excellent! No Issues Found

All 247 links are working correctly!

Health Score: 100/100 ✨

Your site has:
✅ No broken links
✅ No insecure HTTP links
✅ No unnecessary redirects

💡 Recommendation:
Run this check monthly to maintain link health.
```

**Case 2: All Links Broken**
```
❌ Critical: Multiple Broken Links

Found 89 broken links across all pages.

This suggests a possible site-wide issue:
- Domain migration not configured?
- External service outage?
- Relative URL path issues?

🔍 Recommended Action:
1. Check if external services are down
2. Verify domain and SSL configuration
3. Test a few links manually
4. Contact Webflow support if needed

Shall I still proceed with individual link fixes? (yes/no)
```

**Case 3: Mixed HTTP/HTTPS Site**
```
⚠️ Mixed Content Warning

Your site uses HTTPS but has 18 HTTP links.

This creates:
- Security warnings in browsers
- SEO penalties
- Trust issues for visitors

🔧 Recommendation:
Upgrade all HTTP links to HTTPS (all 18 can be auto-fixed)

Proceed with upgrade? (yes/no)
```

**Case 4: Redirect Chains**
```
⚠️ Redirect Chain Detected

Link: https://example.com/old
  → 301 to: https://example.com/temp
  → 301 to: https://example.com/final

Recommendation: Update directly to final URL
- Improves page load speed
- Reduces redirect overhead
- Better for SEO

Fix: Update to https://example.com/final

Apply fix? (yes/no)
```

## Production Checklist

Before considering link checker implementation complete:

### ✅ Discovery
- [ ] Sites listed with all details
- [ ] Scope confirmed (static/CMS/both)
- [ ] All pages retrieved
- [ ] All collections identified
- [ ] User understands time estimate

### ✅ Link Extraction
- [ ] Static page links extracted correctly
- [ ] CMS link fields identified
- [ ] Rich Text links parsed correctly
- [ ] All link elements captured (nodeId, URL, text)
- [ ] Duplicate URLs consolidated for validation

### ✅ Validation
- [ ] Each unique URL validated
- [ ] Status codes captured correctly
- [ ] HTTP/HTTPS checking works
- [ ] Redirects detected and final URLs captured
- [ ] Timeout handling implemented
- [ ] Error categorization accurate

### ✅ Analysis
- [ ] Health score calculated correctly
- [ ] Issues prioritized (Critical/Warning/Suggestion)
- [ ] Statistics complete and accurate
- [ ] Internal vs external links separated
- [ ] Location tracking (page/CMS) accurate

### ✅ Suggestion Generation
- [ ] Automatic fixes identified correctly
- [ ] Manual review items flagged
- [ ] HTTPS upgrades verified before suggesting
- [ ] Redirect final destinations verified
- [ ] Preview format clear and detailed
- [ ] Validation status shown for each fix

### ✅ Approval System
- [ ] Granular approval implemented
- [ ] User can select specific fixes
- [ ] "all"/"none"/numbers format works
- [ ] Manual review items separated
- [ ] Clear instructions provided

### ✅ Execution
- [ ] Static page updates work (Designer connected)
- [ ] CMS Link field updates work
- [ ] CMS Rich Text link updates work
- [ ] Batch processing implemented
- [ ] Progress indicators shown
- [ ] Error handling graceful

### ✅ Verification
- [ ] Fixed links re-validated
- [ ] New health score calculated
- [ ] Failures reported clearly
- [ ] Partial successes vs full failures separated
- [ ] Before/after comparison shown

### ✅ Reporting
- [ ] Final summary complete
- [ ] Statistics accurate
- [ ] Recommendations provided
- [ ] Export options offered
- [ ] Next steps clear

### ✅ Error Handling
- [ ] Designer disconnected handled
- [ ] Timeout errors handled
- [ ] Rate limits handled
- [ ] SSL errors handled
- [ ] Partial failures reported separately

### ✅ Performance
- [ ] Batch processing for scale
- [ ] URL deduplication for validation
- [ ] Progress indicators for long operations
- [ ] Timeout protection implemented
- [ ] Efficient API usage

### ✅ User Experience
- [ ] Clear feedback at each step
- [ ] Progress indicators shown
- [ ] Warnings shown before changes
- [ ] Success confirmation clear
- [ ] Recommendations actionable



<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 21/22: safe-publish -->
<!-- ═══════════════════════════════════════════════ -->

---
name: safe-publish
description: Publish a Webflow site with a plan-confirm-publish workflow. Shows what changed since last publish, runs pre-publish checks, and requires explicit confirmation before going live.
---

# Safe Publish

Publish a Webflow site with comprehensive preview, validation, and explicit confirmation workflow.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `data_sites_tool` with action `list_sites` for listing available sites
- Use Webflow MCP's `data_sites_tool` with action `get_site` for detailed site information
- Use Webflow MCP's `data_pages_tool` with action `list_pages` for retrieving all pages
- Use Webflow MCP's `data_cms_tool` with action `get_collection_list` for listing CMS collections
- Use Webflow MCP's `data_cms_tool` with action `list_collection_items` for checking draft items
- Use Webflow MCP's `data_sites_tool` with action `publish_site` for publishing the site
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Site Selection & Status Check
1. **Get site**: Identify the target site. If user does not provide site ID, ask for it.
2. **Fetch site details**: Use Webflow MCP's `data_sites_tool` with action `get_site` to retrieve:
   - Last published date
   - Last updated date
   - Custom domains configured
   - Locale settings
3. **Check publish status**: Determine if site has unpublished changes:
   - Compare `lastUpdated` vs `lastPublished` timestamps
   - If `lastPublished` is null, site has never been published
   - If `lastUpdated` > `lastPublished`, site has unpublished changes

### Phase 2: Change Detection & Analysis
4. **List all pages**: Use Webflow MCP's `data_pages_tool` with action `list_pages`
5. **Identify modified pages**:
   - Compare each page's `lastUpdated` with site's `lastPublished`
   - Flag pages modified after last publish
   - Categorize by type (static, CMS template, archived, draft)
6. **List all collections**: Use Webflow MCP's `data_cms_tool` with action `get_collection_list`
7. **Check for draft items**:
   - For each collection, use Webflow MCP's `data_cms_tool` with action `list_collection_items`
   - Count items where `isDraft: true`
   - Count items modified since last publish
8. **Detect issues**:
   - Draft items that won't be published unless explicitly included
   - Pages missing SEO metadata
   - Broken references (if detectable)

### Phase 3: Pre-Publish Validation & Preview
9. **Run pre-publish checks**:
   - Verify no broken collection references
   - Check for pages with missing required fields
   - Warn about draft items that will remain unpublished
10. **Generate detailed preview**:
    - Show all pages to be published
    - Show all CMS items to be published
    - Display warnings for any issues found
    - Show which domains will be updated
11. **Ask for publish scope**:
    - Webflow subdomain only
    - Custom domains only
    - Both subdomain and custom domains

### Phase 4: Confirmation & Publishing
12. **Require explicit confirmation**:
    - User must type "publish" to proceed
    - "yes" or "y" should NOT trigger publish
    - Show clear warning about what will go live
13. **Execute publish**:
    - Use Webflow MCP's `data_sites_tool` with action `publish_site` with correct parameters
    - Handle `customDomains` as empty array if no custom domains
    - Set `publishToWebflowSubdomain` based on user choice
14. **Capture publish timestamp**:
    - Fetch site info again after publish
    - Record exact publish time from `lastPublished` field

### Phase 5: Verification & Reporting
15. **Verify publish success**:
    - Check that `lastPublished` timestamp updated
    - Verify site is accessible at published URL(s)
    - Report any verification failures clearly
16. **Generate success report**:
    - Show publish timestamp
    - List what went live (pages, items)
    - Provide published URL(s)
    - Show verification status
17. **Handle failures gracefully**:
    - If publish fails, show clear error message
    - Suggest remediation steps
    - Do not retry automatically

## Examples

**User prompt:**
```
Publish my site
```

**Step 1: Site Selection**
```
🚀 Safe Publish - Site Selection

Available Sites:

1. **MCP Demo#1**
   - Last published: January 9, 2026 at 20:05:38 UTC
   - Last updated: January 9, 2026 at 20:49:37 UTC
   - ⚠️ **Has unpublished changes** (updated 44 minutes after last publish)

2. **MCP Demo#2**
   - Last updated: January 9, 2026 at 19:32:53 UTC
   - Status: Not yet published

Which site would you like to publish? (1-2)
```

**Step 2: Change Detection & Preview**
```
🚀 Publish Preview: MCP Demo#1

**Last published:** January 9, 2026 at 20:05:38 UTC
**Time since last publish:** ~1 hour 5 minutes

---

## Changes to Publish:

### 📄 Pages Modified: 1
└── **Home** (/)
    - SEO title updated to "Home Page"
    - Last modified: 21:10:52 UTC

### 📝 CMS Items: 2 draft items to publish

**Blog Posts (2 drafts):**

1. **"Why Webflow MCP Will Transform Your Workflow in 2026!"**
   - Status: Draft
   - Created: 20:24:44 UTC
   - Last modified: 21:11:03 UTC
   - Featured: Yes
   - Slug: webflow-mcp-transform-workflow-2026

2. **"Webflow E-commerce: The Future of Online Shopping in 2026!"**
   - Status: Draft
   - Created: 20:05:24 UTC
   - Last modified: 21:11:11 UTC
   - Featured: Yes
   - Slug: webflow-ecommerce-2026

---

**Pre-Publish Checks:**
- ✅ No broken references detected
- ✅ All required fields populated
- ⚠️ 2 draft items will become published

**Publish Targets:**
- Webflow subdomain: mcp-demo-1-e88499.webflow.io
- Custom domains: None configured

**⚠️ Type "publish" to make these changes live.**
```

**Step 3: After user types "publish"**
```
🔄 Publishing MCP Demo#1...

Progress: ████████████████████ 100%

✅ Published Successfully!

**Site:** MCP Demo#1
**Published at:** 2026-01-09 21:12:52 UTC (January 9, 2026 at 21:12:52)

---

## What Went Live:

### 📄 Pages (1)
- ✅ Home (/) - SEO title updated

### 📝 Blog Posts (2)
- ✅ "Why Webflow MCP Will Transform Your Workflow in 2026!"
- ✅ "Webflow E-commerce: The Future of Online Shopping in 2026!"

---

## Verification:

- ✅ **Site accessible:** Yes
- ✅ **URL:** https://mcp-demo-1-e88499.webflow.io
- ✅ **Status:** Page loading successfully
- ✅ **Content delivery:** Webflow CDN responding

---

**🎉 Your site is now live with all changes published!**

All unpublished changes have been successfully published to the Webflow subdomain. The 2 draft blog posts are now visible on your site.
```

**Alternative: With Warnings**
```
🚀 Publish Preview: Company Site

**Last published:** January 8, 2026 at 14:30:00 UTC

---

## Changes to Publish:

### 📄 Pages Modified: 3
├── **About** (/about)
│   └── Content updated
├── **Contact** (/contact)
│   └── Form fields changed
└── **Home** (/)
    └── Hero section updated

### 📝 CMS Items

**Blog Posts:**
- 5 published items modified
- 2 draft items (will NOT be published automatically)

**Products:**
- 3 new items created
- 1 item updated

---

**Pre-Publish Checks:**
⚠️ **Warnings Found:**

1. **Missing SEO Metadata (2 pages):**
   - /about - No meta description
   - /contact - No meta title or description
   - 💡 Recommendation: Add SEO metadata before publishing

2. **Draft Items (2):**
   - "Upcoming Product Launch" (Blog Post)
   - "Holiday Sale Announcement" (Blog Post)
   - ⚠️ These will remain unpublished

3. **Large Change Set:**
   - 3 pages + 9 CMS items will be updated
   - Consider reviewing changes carefully

**Publish Targets:**
- Webflow subdomain: company-site.webflow.io
- Custom domains: example.com, www.example.com

---

**Would you like to:**
1. Proceed with publish (type "publish")
2. Cancel and review (type "cancel")
```

## Guidelines

### Phase 1: Critical Requirements

**Site Status Check:**
- Always fetch complete site details using `data_sites_tool` with action `get_site`
- Compare `lastUpdated` vs `lastPublished` to detect unpublished changes
- If timestamps are identical, inform user "No changes to publish"
- If `lastPublished` is null, warn "First publish - entire site will go live"

**Timestamp Handling:**
- Store both ISO format and human-readable format
- Calculate time elapsed since last publish
- Show timezone (prefer UTC for clarity)

### Phase 2: Change Detection Rules

**Page Change Detection:**
- Compare page `lastUpdated` with site `lastPublished`
- Only flag pages where `lastUpdated > lastPublished`
- Categorize changes:
  - Content changes (hard to detect via API)
  - SEO metadata changes (compare if available)
  - Structural changes (page created/deleted)

**CMS Item Detection:**
- Check `isDraft` field for all items
- Compare `lastUpdated` with site `lastPublished`
- Count items in each state:
  - Published + not modified
  - Published + modified
  - Draft (won't be published)
  - Archived (won't appear on site)

**Collections to Check:**
- Query all collections with `data_cms_tool` with action `get_collection_list`
- For each collection, list items with `data_cms_tool` with action `list_collection_items`
- Batch queries if site has many collections (10+ collections)

### Phase 3: Pre-Publish Validation

**Required Checks:**
1. **Broken References:**
   - Check if referenced items exist
   - Warn if reference field points to deleted/archived item
   - Note: API may not expose this easily - best effort

2. **Missing Required Fields:**
   - Verify all required CMS fields are populated
   - Warn if required fields are empty (shouldn't be possible, but check)

3. **SEO Completeness:**
   - Check pages for missing `seo.title` or `seo.description`
   - Warn but don't block publish
   - Provide recommendations for improvement

4. **Draft Item Warning:**
   - Clearly list all draft items
   - Explain they will remain unpublished
   - Offer to cancel if user wants to publish drafts first

**Warning Levels:**
- 🔴 **Critical**: Would break site (broken refs, missing required fields)
- ⚠️ **Warning**: Suboptimal but publishable (missing SEO, drafts)
- 💡 **Suggestion**: Best practices (add meta descriptions, optimize images)

**When to Block Publish:**
- Only block if critical errors found
- For warnings and suggestions, allow user to proceed
- Always show warnings prominently

### Phase 4: Confirmation & Publishing

**Confirmation Requirements:**
- User MUST type "publish" (case-insensitive)
- Do NOT accept: "yes", "y", "ok", "go", "confirm"
- Rationale: Prevents accidental publishes from generic confirmations
- If user types anything else, ask again or treat as cancel

**Publish API Usage:**
```javascript
// Correct format for data_sites_tool with action publish_site
{
  "site_id": "site-id-here",
  "publishToWebflowSubdomain": true,  // or false
  "customDomains": []  // MUST be array, even if empty
}

// If custom domains exist:
{
  "site_id": "site-id-here",
  "publishToWebflowSubdomain": false,
  "customDomains": ["example.com", "www.example.com"]
}
```

**Domain Selection:**
- If no custom domains: Publish to subdomain only
- If custom domains exist: Ask user which to publish to
  - Subdomain only
  - Custom domains only
  - Both
- Default to subdomain if user doesn't specify

**Error Handling:**
- If `customDomains` validation error: Ensure it's an array
- If `400 Bad Request`: Check request format
- If `403 Forbidden`: Check site publish permissions
- If `500 Server Error`: Retry once after 5 seconds, then report failure

### Phase 5: Verification & Reporting

**Post-Publish Verification:**
1. **Fetch Updated Site Info:**
   - Call `data_sites_tool` with action `get_site` again
   - Verify `lastPublished` timestamp updated
   - If timestamp didn't update, publish may have failed

2. **Site Accessibility Check:**
   - Use WebFetch to check published URL
   - Verify site returns 200 OK
   - Check that content is served (not error page)
   - Measure response time

3. **Custom Domain Checks:**
   - If published to custom domains, verify each domain
   - Some domains may take time to propagate (DNS)
   - Note: "Domain may take a few minutes to update" if slow

**Verification Failure Handling:**
- If site not accessible: Report clearly
- Note: Changes ARE published even if verification fails
- Possible causes:
  - DNS propagation delay
  - CDN cache not yet cleared
  - Temporary Webflow infrastructure issue
- Suggest: "Try accessing the site in 2-3 minutes"

**Success Report Format:**
```
✅ Published Successfully!

Site: [Site Name]
Published at: [ISO Timestamp] ([Human Readable])

What Went Live:
- X pages modified
- Y CMS items published
- Z draft items promoted to published

Verification:
✅ Site accessible
✅ URL: [primary URL]
✅ Response time: [Xms]

[If custom domains]
Custom Domains:
✅ example.com - accessible
⚠️ www.example.com - propagating (may take 2-3 minutes)
```

### Best Practices

**Always:**
- ✅ Show comprehensive preview before publishing
- ✅ Require explicit "publish" confirmation
- ✅ Verify site after publish
- ✅ Report exact publish timestamp
- ✅ List all changes going live
- ✅ Warn about draft items

**Never:**
- ❌ Publish without explicit user confirmation
- ❌ Accept generic confirmations like "yes"
- ❌ Hide warnings from user
- ❌ Retry failed publishes automatically
- ❌ Proceed if critical errors detected

**Edge Cases:**

**No Changes to Publish:**
```
ℹ️ No Changes to Publish

Last published: January 9, 2026 at 20:05:38 UTC
Last updated: January 9, 2026 at 20:05:38 UTC

All changes are already published. Your site is up to date!
```

**First Publish (Never Published Before):**
```
⚠️ First Publish Warning

This site has NEVER been published before.

This will make the ENTIRE site publicly accessible:
- All pages (2 pages)
- All CMS items (47 items across 3 collections)
- All assets

Are you ready to make this site live?
Type "publish" to proceed, or "cancel" to abort.
```

**Publish to Staging Subdomain:**
- If site has custom domains but user chooses subdomain only
- Useful for testing before publishing to production domain
- Explain: "Publishing to subdomain only. Custom domains will continue showing old version."

**Partial Publish Not Supported:**
- Webflow publishes entire site, not individual pages
- Cannot publish specific pages or collections
- If user asks to "publish just the homepage", explain limitation
- Alternative: Use staging subdomain for testing

### Performance Optimization

**For Large Sites:**
- Sites with 100+ pages or 1000+ items may take time to analyze
- Show progress: "Analyzing 150 pages..."
- Batch API calls when possible
- Consider skipping detailed diff for very large change sets

**Caching:**
- Cache site info during workflow (don't refetch unnecessarily)
- Only refetch after publish to verify

**Timeouts:**
- Publish API may take 10-30 seconds for large sites
- Don't timeout too quickly
- Show: "Publishing... this may take up to 30 seconds for large sites"

### Error Messages

**Clear and Actionable:**

❌ **Bad:**
```
"Publish failed"
```

✅ **Good:**
```
"Publish Failed: Validation Error

The Webflow API returned an error:
- customDomains parameter must be an array

This is likely a configuration issue. Retrying...
```

**Common Errors:**

1. **Validation Error (customDomains):**
   - Fix: Ensure `customDomains: []` is an array
   - Don't pass null or omit the field

2. **Site Not Found:**
   - User may have provided wrong site ID
   - List available sites and ask user to select

3. **Insufficient Permissions:**
   - Site may require specific publish permissions
   - Check workspace access settings

4. **Publish Already in Progress:**
   - Another publish may be running
   - Wait 30 seconds and try again




<!-- ═══════════════════════════════════════════════ -->
<!-- SKILL 22/22: site-audit -->
<!-- ═══════════════════════════════════════════════ -->

---
name: site-audit
description: Comprehensive audit of a Webflow site including pages, CMS collections, health scoring, and actionable insights. Use for site analysis, migration planning, or understanding site structure.
---

# Site Audit

Comprehensive audit of a Webflow site's structure, content health, and quality with detailed analysis and multiple export formats.

## Important Note

**ALWAYS use Webflow MCP tools for all operations:**
- Use Webflow MCP's `data_sites_tool` with action `list_sites` for listing available sites
- Use Webflow MCP's `data_sites_tool` with action `get_site` for detailed site information
- Use Webflow MCP's `data_pages_tool` with action `list_pages` for retrieving all pages
- Use Webflow MCP's `data_cms_tool` with action `get_collection_list` for listing CMS collections
- Use Webflow MCP's `data_cms_tool` with action `get_collection_details` for detailed collection schemas
- Use Webflow MCP's `data_cms_tool` with action `list_collection_items` for counting items
- Use Webflow MCP's `webflow_guide_tool` to get best practices before starting
- DO NOT use any other tools or methods for Webflow operations
- All tool calls must include the required `context` parameter (15-25 words, third-person perspective)

## Instructions

### Phase 1: Site Selection & Discovery
1. **Get site**: Identify the target site. If user does not provide site ID, ask for it.
2. **Fetch site details**: Use Webflow MCP's `data_sites_tool` with action `get_site` to retrieve:
   - Site name and ID
   - Last published date
   - Last updated date
   - Timezone
   - Locales (primary and secondary)
   - Custom domains
3. **Ask user preferences**: Ask what level of detail they want:
   - Quick summary (counts only)
   - Standard inventory (pages + collections + counts)
   - Detailed inventory (includes all field schemas, item samples, SEO data)
   - Full export (everything + export to file format)

### Phase 2: Pages Inventory
4. **List all pages**: Use Webflow MCP's `data_pages_tool` with action `list_pages` to fetch all pages
5. **Categorize pages**:
   - Static pages (no collectionId)
   - CMS template pages (has collectionId)
   - Archived pages
   - Draft pages
6. **Analyze page structure**:
   - Count pages by type
   - Identify pages missing SEO metadata
   - Detect orphaned pages (no navigation links)
   - Check for duplicate slugs

### Phase 3: CMS Collections Inventory
7. **List all collections**: Use Webflow MCP's `data_cms_tool` with action `get_collection_list`
8. **For each collection**:
   - Get detailed schema using Webflow MCP's `data_cms_tool` with action `get_collection_details`
   - Count items using Webflow MCP's `data_cms_tool` with action `list_collection_items`
   - Analyze field types and requirements
   - Identify required vs optional fields
   - Detect reference fields and relationships
9. **Collection analysis**:
   - Empty collections (0 items)
   - Unused collections (no template page)
   - Large collections (100+ items)
   - Collections with missing required fields

### Phase 4: Analysis & Insights
10. **Generate insights**:
    - Total content count (pages + items)
    - Content health score
    - SEO readiness
    - Recommended improvements
11. **Identify issues**:
    - Missing SEO metadata
    - Empty collections
    - Orphaned pages
    - Draft content ratio
12. **Show relationships**:
    - Which pages use which collections
    - Reference field connections
    - Content dependencies

### Phase 5: Export & Formatting
13. **Ask export format** (if user wants full export):
    - Markdown (readable, great for documentation)
    - JSON (machine-readable, for migrations)
    - CSV (spreadsheet-friendly, for analysis)
    - Text summary (console output only)
14. **Generate report** in requested format
15. **Provide actionable insights**: Suggest next steps based on findings

## Examples

**User prompt:**
```
Give me a complete inventory of my site.
```

**Step 1: Initial Report (Standard Inventory)**
```
📊 Site Audit: MCP Demo#1

**Site Details:**
- Site ID: 6924868ede9d3fbbc3195eb0
- Last published: January 9, 2026
- Last updated: January 9, 2026
- Timezone: Asia/Calcutta
- Primary locale: English (en)

---

**Pages (2 total):**

Static Pages (1):
├── Home (/)

CMS Template Pages (1):
└── Blog Posts Template (/post)
    - Collection: Blog Posts

---

**CMS Collections (1):**

Blog Posts (9 items)
├── Slug: post
├── Fields (8):
│   ├── Name (PlainText, required)
│   ├── Slug (PlainText, required)
│   ├── Post Body (RichText)
│   ├── Post Summary (PlainText)
│   ├── Main Image (Image)
│   ├── Thumbnail image (Image)
│   ├── Featured? (Switch)
│   └── Color (Color)

---

**Summary:**
- ✅ 2 pages (1 static, 1 CMS template)
- ✅ 1 CMS collection with 9 published items
- ✅ Site fully published and up-to-date

Would you like a detailed analysis or export in a specific format?
```

**Step 2: Detailed Analysis (when user requests)**
```
🔍 Detailed Analysis: MCP Demo#1

**Content Health Score: 85/100**

✅ Strengths:
- All collections have items (no empty collections)
- All pages are published (no drafts)
- Site recently published (Jan 9, 2026)
- Consistent field structure in Blog Posts

⚠️ Areas for Improvement:
- No SEO metadata on template page (missing meta description)
- Limited page count (consider adding About, Contact pages)
- No reference fields (could link categories/authors to posts)

💡 Recommendations:
1. Add meta descriptions to all pages for better SEO
2. Consider creating a Categories collection for post organization
3. Add an Authors collection for multi-author blog support
4. Create navigation pages (About, Contact, Privacy Policy)

**Collection Breakdown:**

Blog Posts:
- 9 published items (0 drafts, 0 archived)
- 5 featured posts (56%)
- All required fields populated ✓
- Field usage:
  - Name: 100% (9/9)
  - Slug: 100% (9/9)
  - Post Body: 100% (9/9)
  - Post Summary: 100% (9/9)
  - Main Image: 100% (9/9)
  - Thumbnail: 100% (9/9)
  - Featured: 100% (9/9)
  - Color: 100% (9/9)

**Sample Items:**
1. "Why Webflow is the Best Choice for 2026" (featured)
2. "Top Webflow Features to Look Forward to in 2026"
3. "Webflow vs. Competitors: Who Will Win in 2026?" (featured)

---

Export this inventory? (markdown/json/csv/no)
```

**Step 3: Export Options**
```
📥 Export Format Options:

1. **Markdown** - Human-readable documentation
   - Great for README files, wikis, documentation
   - Preserves structure and formatting

2. **JSON** - Machine-readable structured data
   - Perfect for migrations, integrations
   - Includes all raw API data

3. **CSV** - Spreadsheet-friendly
   - Easy to analyze in Excel/Google Sheets
   - Separate files for pages and collections

Which format would you like? (1/2/3)
```

## Guidelines

### Phase 1: Critical Requirements

**Site Information:**
- Always fetch complete site details using `data_sites_tool` with action `get_site`
- Include last published and last updated dates
- Show timezone and locale information
- Display custom domains if configured

**User Options:**
Offer multiple detail levels:
- Quick: Just counts
- Standard: Pages + collections + basic info
- Detailed: Full schema + analysis + insights
- Export: Everything + file output

### Phase 2: Pages Analysis

**Page Categorization:**
- Separate static pages from CMS template pages
- Flag archived and draft pages separately
- Show page slugs/URLs for reference
- Identify pages with missing SEO metadata

**Page Health Checks:**
- Missing meta descriptions
- Missing OG tags
- Duplicate slugs (error condition)
- Orphaned pages (not linked in nav)

### Phase 3: Collections Analysis

**Collection Details:**
For each collection, show:
- Display name and singular name
- Slug (URL structure)
- Total field count
- Required vs optional fields breakdown
- Item count (published/draft/archived)
- Last updated date

**Field Analysis:**
Categorize by type:
- Text fields (PlainText, RichText)
- Media fields (Image, Video, File)
- Relationship fields (Reference, MultiReference)
- Data fields (DateTime, Number, Color)
- Boolean fields (Switch)
- Selection fields (Option)

**Field Validation:**
- Show max length constraints
- Show validation patterns
- Flag required fields
- Identify reference field targets

### Phase 4: Analysis & Insights

**Content Health Score (0-100):**
Calculate based on:
- SEO metadata completeness (25 points)
- Content-to-page ratio (20 points)
- Field utilization (20 points)
- Recent updates (15 points)
- Structure quality (20 points)

**Issue Detection:**
- 🔴 Critical: Missing required fields, duplicate slugs
- ⚠️ Warning: Empty collections, missing SEO, drafts
- 💡 Suggestion: Add pages, create relationships, organize

**Recommendations:**
Suggest improvements based on:
- Missing page types (About, Contact, etc.)
- Underutilized collections
- Missing relationships between collections
- SEO optimization opportunities

### Phase 5: Export Formats

**Markdown Export:**
```markdown
# Site Audit: [Site Name]

## Site Information
- ID: [site-id]
- Last Published: [date]

## Pages
### Static Pages
- Home (/)
- About (/about)

### CMS Templates
- Blog Post (/post/[slug])

## Collections
### Blog Posts (47 items)
**Fields:**
- Title (PlainText, required)
- Slug (PlainText, required)
- Content (RichText)
...
```

**JSON Export:**
```json
{
  "site": {
    "id": "...",
    "name": "...",
    "lastPublished": "..."
  },
  "pages": [...],
  "collections": [...]
}
```

**CSV Export:**
Generate separate files:
- `pages.csv`: All pages with metadata
- `collections.csv`: Collection metadata
- `fields.csv`: All fields across collections
- `items.csv`: Item counts per collection

### Performance Optimization

**Batch Processing:**
- For sites with 20+ collections, show progress
- For collections with 100+ items, paginate counts
- Provide estimated time for large sites

**Error Handling:**
- If `data_pages_tool` with action `list_pages` fails, continue with collections
- If `data_cms_tool` with action `get_collection_details` fails, show basic collection info
- Report partial successes separately
- Offer to retry failed operations

**Data Efficiency:**
- Use pagination for large result sets
- Only fetch detailed schemas when needed
- Limit item samples to 3-5 per collection
- Cache site info for repeat operations

### Best Practices

**Read-Only Operation:**
- No confirmation needed (read-only)
- Safe to run multiple times
- No side effects or modifications

**Clear Organization:**
- Group by content type (pages/collections)
- Use visual hierarchy (├── └──)
- Show counts prominently
- Highlight issues with icons (✅ ⚠️ 🔴 💡)

**Actionable Output:**
- Always end with recommendations
- Offer export options for detailed inventories
- Suggest next steps based on findings
- Provide comparison against best practices

**Version Tracking:**
If user runs inventory multiple times:
- Compare with previous run
- Show changes (new pages, deleted collections)
- Track content growth over time
- Alert on significant changes



