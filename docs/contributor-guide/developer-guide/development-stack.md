# Development stack

## Dev database

Dev database container is not linked to any external storage so if you delete the container, you will lose all data previously persisted.
Note if you restart a paused container, you could still see the change(s) applied from previous session(s).

If you wish to create new table(s) or change schema, please add the SQL(s) under [`conf/evolutions/default/`](https://github.com/civiform/civiform/tree/main/server/conf/evolutions/default).
You will need to create or update corresponding EBean model(s) under [`app/models/`](https://github.com/civiform/civiform/tree/main/server/app/models), and potentially one or more repositories under [`app/repository/`](https://github.com/civiform/civiform/tree/main/server/app/repository) for how you'd like to interact with the table(s).

In dev mode, Play automatically applies the evolution scripts to set up the schema, including making destructive changes if the database is out-of-sync.  You'll be notified if it needs manual resolution.
If the database is in an inconsistent state in dev mode, it is usually easier to trash the problem database and start a new one.

If we want to undo a schema change, we create new evolution scripts that modify the schema.

## Dev integration with IDCS and AD

We can't dev test with accounts.  It's a TODO to try to use the OIDC provider that we use for unit tests.  See `test/app/SecurityBrowserTest.java` for examples of how to interact with that.
