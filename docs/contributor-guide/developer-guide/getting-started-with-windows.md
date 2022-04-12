# Getting started with Windows

There are special considerations involved with getting an environment set up in Windows, notably with:

1. Setting up Docker with a Windows Subsystem for Linux (WSL 2) backend
2. Setting up an IDE

## Docker (with WSL 2 backend)

We recommend running Docker in Windows with WSL 2.

### Windows Subsystem for Linux 2 (WSL 2)

Follow the [**Windows WSL Installation Guide**](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to install WSL 2. There are two ways to install WSL 2:

1. Join the Windows Insider Program (not recommended)
2. Manually install WSL 2

Windows Insider Program may not be available on corporate devices.

#### System Requirements

You’ll need to have virtualization enabled on your machine. To check if you have virtualization enabled: open the Task Manager, go to the Performance tab, and under CPU verify `Virtualization: Enabled`.

![Windows task manager virtualization check](https://drive.google.com/uc?id=1jknfSqD\_qUEU8ulsFko52PG31eYs6QSm)

| :bangbang: | If virtualization is disabled, you’ll need to boot up into the BIOS and enable virtualization. If your machine does not support virtualization you won't be able to proceed. |
| :--------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### Is it working?

Follow [**Windows guide to running WSL**](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#ways-to-run-wsl) to run your virtual machine with WSL 2.

### Problems

#### "WSL is not recognized as the name of a cmdlet"

PowerShell does not recognize `wsl` command.

**Solution**: Reinstall WSL, making sure you run everything with administrator privileges.

#### "The service cannot be started"

Running `wsl` commands with PowerShell generates the following error:

![WSL error: service cannot be started](https://drive.google.com/uc?id=1pwt7Lp-\_sjS99lCv08EriPjM01K5hYtN)

**Solution**: [**From WSL GitHub issue 3386**](https://github.com/Microsoft/WSL/issues/3386)**: in the command prompt (not PowerShell)** with administrator privileges, execute `sc config LxssManager start=auto`

#### Unable to access the Microsoft Store

You won't be able to install a Linux distribution from the Microsoft Store if you don't have privileges to access the store.

**Solution**: You'll have to follow [**Microsoft's guide to manually install a distribution**](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions).

#### WSL is not connected to the internet

In your WSL distribution, you can `ping` your favorite website to check for internet connectivity.

**Multi-part solution**: First, make sure your Linux distribution is connected to the right DNS server. The DNS server used by Windows can be identified with `IPCONFIG /ALL | FIND /I "DNS Server"` in the command prompt. The DNS server used by Linux is found in the `/etc/resolv.conf` file. They should be the same.

**If it's still broken**, follow the [**stackoverflow solution for no internet connection on WSL Ubuntu**](https://stackoverflow.com/questions/62314789/no-internet-connection-on-wsl-ubuntu-windows-subsystem-for-linux).

**If resetting your network says "Access is denied"**, try [**this solution**](https://davidvielmetter.com/tricks/netsh-int-ip-reset-says-access-denied/).

### Installing and configuring Docker

| :bangbang: | If you already had Docker installed before setting up WSL 2, you may want to uninstall and reinstall Docker so it installs with the required components for WSL 2. |
| :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

As you install Docker, make sure you install the required Windows components for WSL 2.

![Docker install with WSL components](https://drive.google.com/uc?id=1dT9X\_myIs5oDWdgJxMtSJy7vft94qRWh)

Once installed, check `Settings > General` to make sure WSL is used.

![Docker is using WSL](https://drive.google.com/uc?id=1KsFOCAgWTQ7evWJSD324Z1Biwjc47fvi)

Also check `Settings > Resources > WSL Integration` to select your Linux distribution.

![Docker is using specified Linux distribution](https://drive.google.com/uc?id=1qyuU2k\_fCiwCWglWms\_kv3EHnhbF2XJ0)

#### Problems

**No WSL 2 distribution found**

Docker may not be able to find any WSL 2 distributions. This means your distributions are configured with WSL 1.

![Docker error: no WSL 2 distributions found](https://drive.google.com/uc?id=1R7JMIZZuL4qZZ5Q4iALhJ7IWRa6dBTTx)

**Solution**: You can try to upgrade the distribution with `wsl --set-version <distro-name> 2` (e.g. `wsl --set-version Ubuntu-20.04 2`). If this doesn't work, you can uninstall and reinstall it.

**Linux distribution is not running**

For some reason, the distribution may not be running. You can check by running `wsl -l -v`. You'll want everything to be running with version 2:

![WSL all instances running with version 2](https://drive.google.com/uc?id=1JXndL2-z2Gqvhs5P-JClaIjlTxIAXVty)

**Solution**: Follow the [**Windows guide to running WSL**](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#ways-to-run-wsl) to run your virtual machine with WSL 2.

**Docker fails to start**

**Solution**: In Docker Desktop, click the bug icon in the top right corner. Try `Restart Docker Desktop` and restart your computer. If that isn't strong enough, try `Reset to factory defaults` and restart your computer. If that still doesn't work, uninstall Docker and reinstall it.

### Is it working?

If things are working, you'll be able to run CiviForm in WSL with Docker using the following steps:

1. In WSL, clone [**the CiviForm repository**](https://github.com/seattle-uat/civiform).
2. Run [**`/bin/run-dev`**](https://github.com/seattle-uat/civiform/blob/main/bin/run-dev) to start the application.
3. In a browser, go to `localhost:9000`, and then wait for the application to load.

## Getting an IDE

We recommend Intellij. Here are [**other IDEs supported by Play**](https://www.playframework.com/documentation/2.8.x/IDE).

There are two options for configuring an IDE:

1. **(faster to set up, slower development time)**: store and edit files directly in Windows (e.g. C:) and use WSL to run the `bin` commands through `/mnt/c`.
2. **(more setup, faster development time)**: Store, edit, and run everything from within WSL 2.

### Developing with files stored in Windows

| :bangbang: | It's slow to run start and test the application when the files are stored in Windows because Docker runs in WSL, and will be accessing files through the `/mnt/c` mount. |
| :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

1. From WSL, `git clone` the CiviForm repository somewhere in your Windows file system (`/mnt/c/...`).
2. Install jdk 11 for Windows: [**http://jdk.java.net/java-se-ri/11**](http://jdk.java.net/java-se-ri/11)
3. Install sbt 1.3.13 for Windows: [**https://www.scala-sbt.org/download.html**](https://www.scala-sbt.org/download.html)
4. Install and configure IntelliJ in windows from [**https://www.jetbrains.com/idea/**](https://www.jetbrains.com/idea/)
5. Open IntelliJ, download the Scala plugin, and restart IntelliJ.
6. Open IntelliJ and open the [**`universal-application-tool-0.0.1/build.sbt`**](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/build.sbt) file as a project.
7. Wait for a while for IntelliJ to index the project.

| :bangbang: | While waiting for step 6, you may need to restart IntelliJ. This step takes a long time, but it takes a long time the first time. |
| :--------: | --------------------------------------------------------------------------------------------------------------------------------- |

The files are stored in Windows, and WSL is used to run `bin/run-dev` and other `bin` executables.

| :bangbang: | You may need to configure the IDE to use Linux line endings. |
| :--------: | ------------------------------------------------------------ |

### Developing with files stored in WSL

You'll need a UI to access an IDE in WSL. A couple options:

1. [https://medium.com/javarevisited/using-wsl-2-with-x-server-linux-on-windows-a372263533c3](https://medium.com/javarevisited/using-wsl-2-with-x-server-linux-on-windows-a372263533c3)
2. [https://www.nextofwindows.com/how-to-enable-wsl2-ubuntu-gui-and-use-rdp-to-remote](https://www.nextofwindows.com/how-to-enable-wsl2-ubuntu-gui-and-use-rdp-to-remote)

From within WSL:

1. `git clone` the CiviForm repository in WSL

| :bangbang: | Do not clone into `/mnt/c` |
| :--------: | -------------------------- |

1. Install zip using `sudo apt install zip unzip`
2. Install [sdkman](https://sdkman.io/install), and use it to install `sdk install java 11.0.10-open`, `sdk install sbt 1.3.13`, and `sdk install scala 2.13.1`.
3. Install IntelliJ.
4. Open IntelliJ, download the Scala plugin, and restart IntelliJ.
5. Open IntelliJ and open the [**`universal-application-tool-0.0.1/build.sbt`**](https://github.com/seattle-uat/civiform/blob/main/universal-application-tool-0.0.1/build.sbt) file as a project.
6. Wait for a while for IntelliJ to index the project.

| :bangbang: | While waiting for step 6, you may need to restart IntelliJ. This step takes a long time, but it takes a long time the first time. |
| :--------: | --------------------------------------------------------------------------------------------------------------------------------- |
