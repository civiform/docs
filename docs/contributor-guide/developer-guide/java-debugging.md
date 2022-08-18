# Java Debugging

## Debug Ports

| Server environment | script                             | Server Port | Debug Port |
| ------------------ | ---------------------------------- | ----------- | ---------- |
| Dev                | bin/run-dev, bin/sbt, bin/dev-bash | 9000        | 8457       |
| Unit test          | bin/run-test, bin/sbt-test         | 9100        | 8459       |
| Browser test       | bin/run-test, bin/sbt-test         | 9999        | 9457       |

## Setting up your debugger

### IntelliJ

Note: we have an example of setting up a debugger in IntelliJ, which is available on Linux, OSX, and Windows. We recommend IntelliJ strongly, since our application is a mix of Scala and Java code, and IntelliJ is the best tool we know that will follow code references and correctly handle code-completion in mixed Java and Scala code.

Open your list of run/debug configurations.

![open run/debug configurations](https://i.imgur.com/LJHe43d.png)

Click "Edit configurations".

![Click 'edit configurations'.](https://imgur.com/pGgzgr9.png)

Add a new configuration

![Add a new configuration](https://imgur.com/ELrzsML.png)

of the "remote debug" type.

![Use the remote debug option.](https://imgur.com/t3GJtY2.png)

The page should prepopulate with most of these options - fill in your debug port from the table above ( `8457` for the dev environment).

![Fill in the port, and check the rest of the settings.](https://i.imgur.com/hpWWwYp.png)

### VSCode

Follow Microsoft's Guide [https://code.visualstudio.com/docs/java/java-debugging] to configure debugging.

The `civiform.code-workspace` workspace file already has debug configurations setup for each of the 3 environments - make sure to select the correct one from the "Run and Debug" tab, then click "attach".

## Running the debugger

First, run `bin/run-dev` (or the unit/browser test scripts) to run a debuggable process. You'll know it's debuggable if it prints `Listening for transport dt_socket at address` in the startup logs. Then, click the bug icon to start debugging with your new debug configuration. You should see this: ![Debugger example.](https://imgur.com/NHbx2Km.png)
