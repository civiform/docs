# File storage backend

Civiform currently supports file uploads using AWS S3. There is an effort in progress to add support for Azure Blob Storage. Support for other storage services like Google Cloud Storage is planned. This document will provide an overview of the classes and interfaces that are used to implement support for new storage providers.

### Testing the Storage Backend

File upload functionality uses the Azurite / Localstack emulators. For Azure-based file uploads to work in your browser, you will need to add the following line to your local `/etc/hosts` file:

```
127.0.0.1 azurite
127.0.0.1 localstack
```

This is because the application makes requests to Azurite using its container name, which can only be resolved when the request is made from within the Docker network. These container names to be mapped to the loopback IP address in order for the browser to resolve requests to `azurite` to upload and get uploaded images.

Note to Googlers: if you are using your Chrome profile for your Corp account, you'll run into CORS and UberProxy errors. Switch to a personal or incognito Chrome profile.

### `StorageClient` interface

The `StorageClient` interface is used to decouple classes for interacting with specific storage providers from the rest of the codebase. New controllers and views should depend on the StorageClient interface rather than one of its implementations. In order to determine which `StorageClient` implementation to use at runtime, we use Guice for dependency injection. The `CloudStorageModule` Guice module reads in the `cloud.storage` property set in `application.conf`, and binds the corresponding implementation to the implementation. For more info on how this works, see the [Guice documentation on bindings](https://github.com/google/guice/wiki/Bindings).

Each implementation of StorageClient uses an implementation of an inner `Client` interface depending on the environment the application is running in (dev, test, or prod). The inner `Client` implementations for new classes implementing `StorageClient` should have one client that interacts with the emulator, one stub (for unit tests), and one client that interacts with a real instance of the storage backend.

![Class Diagram for StorageClient interface](https://lucid.app/publicSegments/view/9fec58c4-7096-4e78-a453-fbbd4dd813a0/image.png)

### `StorageUploadRequest` interface

Implementations of the `StorageUploadRequest` class hold all the information necessary to upload a file from the browser. Implementations of `StorageClient` are used to generate instances of `StorageUploadRequest` implementations (`BlobStorageUploadRequest`,`SignedS3UploadRequest`) and the generated instances are passed to the render methods in view classes.

![Class diagram for StorageUploadRequest interface](https://lucid.app/publicSegments/view/ad86fe39-a028-46fb-bce8-114a738fea42/image.png)

### Strategy Pattern

The controller and view classes that interact with the interfaces above might need to change the behavior of a method (for example, render a different template) depending on which storage provider is being used. To accomplish this, we make use of the [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy\_pattern). Each class where the strategy pattern is being used has its own corresponding strategy interface. Implementations are bound to the interface in the `CloudStorageModule` file. Below is an example of how the strategy pattern is used:

![Strategy pattern example](https://lucid.app/publicSegments/view/fa4e6623-7e59-46ad-bd57-520649ee3cf9/image.png)

[Link to diagrams on LucidChart](https://lucid.app/lucidchart/7c543f7a-1e4f-4908-ad91-8193e4cc0f2b/edit?invitationId=inv\_483bd661-baca-43a0-a760-33206fc128e9)
