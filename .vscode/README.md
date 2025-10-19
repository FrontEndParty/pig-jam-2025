# VSCode Workspace Settings

This folder contains shared VSCode settings for the game jam project.

## What's Included

### settings.json
- **No auto-formatting**: Keeps your code exactly as you write it
- **ESLint enabled**: But with very relaxed rules (see below)
- **No auto-fix on save**: Won't change your code automatically
- **TypeScript integration**: Uses the project's TypeScript version

### extensions.json
- **Recommended extension**: ESLint extension for VSCode
- VSCode will prompt you to install this when you open the project

## Linting Philosophy

This project uses **extremely relaxed** linting rules designed for rapid game jam development:

✅ **What IS enforced:**
- TypeScript syntax that would prevent compilation
- Basic code structure

❌ **What is NOT enforced:**
- Unused variables or parameters
- Console.log statements
- Any rules
- Explicit types
- Empty functions
- Code style or formatting

## For Developers

### If you use VSCode or Cursor:
1. Install the ESLint extension when prompted
2. Everything should "just work" - no configuration needed!
3. You'll see very few (if any) warnings or errors

### If you use a different editor:
- ESLint configuration is in `eslint.config.mjs` in the project root
- TypeScript configuration is in `tsconfig.json` in the project root
- Both are set to be very permissive

## Running Lint Manually

```bash
npm run lint
```

This will check your TypeScript files but won't complain about most things!

## Questions?

The goal is: **If it compiles and runs, ship it!** 🚀

Don't worry about perfect code during the jam. Focus on making something fun!
