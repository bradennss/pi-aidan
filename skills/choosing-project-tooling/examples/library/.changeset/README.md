Run `pnpm changeset` for a user-visible change. Select this package, choose a semantic version bump, and describe the change for its changelog. Commit the resulting Markdown file with the change.

When preparing a release, run `pnpm version:prepare`, review the version, changelog, and lockfile, then submit them for review. The private placeholder can be versioned locally but cannot be published. Version preparation grants no publication approval. Follow [release operations](../docs/releasing.md) for bootstrap, explicit publication, and artifact recovery.
