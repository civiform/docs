# Dependencies

This page will describe the ways in which Civiform maintainers manage, track, and update dependencies.

## Dependency Plugin for sbt

To view all dependencies, open an sbt shell using `bin/sbt`, then run the `dependencyBrowseTree` command. This will open up an HTML page displaying a searchable version of the complete Java dependency graph (including transitive dependencies). 

## Dependency Updates

Dependency updates are automated using [RenovateBot](https://docs.renovatebot.com/). Some dependencies are updated individually, while other dependencies (like pac4j and fasterxml/jackson) are grouped and updated together. The `renovate.json` file at the root of the repo controls which dependencies are grouped together for updates. The `renovate.json` file is also where you can configure Renovate to ignore updates for specific dependencies.

A Renovate PR will look something like this:
<img width="1009" alt="image" src="https://user-images.githubusercontent.com/19631367/160932499-3c19b703-841b-4c39-837e-7e608f72a78b.png">

Before merging a Renovate PR, you can check the adoption rate, age of the new dependency version, and Renovate's confidence that it won't break your build. You can also view the changelog between the current and new versions.

In general dependency updates for parts of the code base that are heavily tested (like Java code) are good to merge as long as tests pass, while updates to less thoroughly tested parts of the code (like Terraform code) should be handled with caution.

