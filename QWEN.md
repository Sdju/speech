# Speech Presentations Project

## Overview

This is a project for creating and managing presentation slides using [Slidev](https://sli.dev), a presentation framework based on Vue and Markdown. The project includes a script for generating new presentation templates with consistent structure and dependencies.

## Project Structure

- `scripts/create-presentation.ts`: Main script for creating new presentation projects
- `_template/`: Template directory used as a base for new presentations
- `2024/`, `2025/`: Year-based directories containing individual presentation projects
- `-static/`: Static assets directory
- Root level files: Project configuration and index file

## Key Features

1. **Automated Project Creation**: The `create-presentation.ts` script automatically generates new presentation projects with proper folder naming, template copying, and dependency installation.

2. **Standardized Template**: All presentations use a consistent template with:
   - Vue-based slide components
   - UnoCSS styling
   - Custom theme and layout components
   - Pre-configured dependencies and build tools

3. **Year-based Organization**: Presentations are organized in yearly directories with numbered prefixes for chronological tracking.

## Creating New Presentations

To create a new presentation, run:

```bash
pnpm presentation:create
```

This will prompt you for:
- Conference name
- Talk title
- Automatically generates folder name in format: `{number}_{conference}_{title}`

The script will:
1. Create a new directory with proper numbering
2. Copy the template files
3. Update configuration files
4. Install project dependencies

## Technology Stack

- **Slidev**: Presentation framework built on Vue.js and Markdown
- **Vue 3**: Component-based UI framework
- **UnoCSS**: Utility-first CSS framework
- **PNPM**: Package manager
- **TypeScript**: Type-safe JavaScript
- **GLSL Shaders**: Custom visual effects support

## Building and Running

### For Individual Presentations

Each presentation directory contains its own `package.json` with these scripts:

- `pnpm dev`: Start development server
- `pnpm build`: Build static files

### Main Project Commands

- `pnpm presentation:create`: Create a new presentation project

## Presentation Structure

Each presentation contains:

- `slides.md`: Main presentation file with markdown and Vue components
- `parts/*.md`: Individual slide sections referenced from main slides file
- `components/`: Vue components for custom slide elements
- `theme/`: Theme configuration and components
- `addon/`: Presentation-specific add-ons (if needed)
- `img/`: Presentation images and assets

## Development Conventions

1. **Naming Convention**: Presentation folders follow `{number}_{conference}_{title}` pattern
2. **Slide Format**: Uses Slidev's markdown format with Vue component support
3. **Theming**: Custom theme components for consistent look and feel
4. **Internationalization**: Content primarily in Russian with potential for multi-language support

## Dependencies

- Slidev (main presentation framework)
- Vue 3 (component system)
- UnoCSS (styling)
- Chroma.js (color manipulation)
- QR Code Styling (for QR code generation)
- Tailwind Merge (utility class management)