# Java Debugging

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

The page should prepopulate with most of these options - fill in `8457` for the port.

![Fill in the port, 8457, and check the rest of the settings.](https://i.imgur.com/hpWWwYp.png)

## Running the debugger

First, run `bin/run-dev` to run a debuggable process. You'll know it's debuggable if it prints `Listening for transport dt_socket at address: 8457` in the startup logs. Then, click the bug icon to start debugging with your new debug configuration. You should see this: ![Debugger example.](https://imgur.com/NHbx2Km.png)
