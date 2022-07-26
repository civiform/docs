# Form submission with Play

## How to configure forms

### Types of forms

There are two types of forms in Play - [**defined forms**](https://www.playframework.com/documentation/2.8.x/JavaForms#Defining-a-form) and [**dynamic forms**](https://www.playframework.com/documentation/2.8.x/JavaForms#Handling-a-form-with-dynamic-fields). Defined forms have pre-defined fields and often map 1:1 to an object. All our defined forms are in the [/app/forms](https://github.com/civiform/civiform/tree/main/server/app/forms) directory. Dynamic forms are those that cannot be defined in advance - for example, we cannot generalize a single form for every block of questions, since each block has a different set of questions. Instead, we use a `DynamicForm` for blocks, which acts like a map of field names to values (see [ApplicantProgramBlocksController#update](https://github.com/civiform/civiform/blob/main/server/app/controllers/applicant/ApplicantProgramBlocksController.java)).

### Process for adding a defined form

1. Define an HTML form - the field `name` attributes must match the Play form method names exactly
2. Add a [POJO](https://en.wikipedia.org/wiki/Plain\_old\_Java\_object) under [/app/forms](https://github.com/civiform/civiform/tree/main/server/app/forms) with getters and setters for each field in the form. **Note**: the getter and setter names must exactly match the HTML input name
3. Bind the form in the controller like so:

```java
// formFactory is a play.data.FormFactory, and request is a play.mvc.Http.Request
Form<MyPojoForm> formWrapper = formFactory.form(MyPojoForm.class).bindFromRequest(request);

if (formWrapper.hasErrors()) {
  // Add any error handling here
}

// Get an instance of your defined form
MyPojoForm form = formWrapper.get();

// Now you can use getters/setters
String myFieldValue = form.getMyField();
```

### Using a `DynamicForm`

Essentially, a `DynamicForm` is a map of \<fieldName, value> pairs. You can use it in a controller like so (assumes you have an HTML form):

```java
// formFactory is a play.data.FormFactory, and request is a play.mvc.Http.Request
DynamicForm form = formFactory.form().bindFromRequest(request);

// Get a single value
String value = form.get("myFieldName");

// Get the entire map of fields to values
Map<String, String> dataMap = form.rawData();
```

### Repeated fields

If you have a form field that is repeated (for example, a checkbox), the `name` attribute must end in square brackets. Example:

```java
<input type="checkbox" name="applicant.kitchen.selections[]" value="toaster">
```

In a defined form, use a mutable `List` for setters and getters ([example POJO with lists](https://github.com/civiform/civiform/blob/main/server/app/forms/MultiOptionQuestionForm.java)).

In a `DynamicForm`, the key will include an index, like so:

```java
DynamicForm form = formFactory.form().bindFromRequest(request);
String firstValue = form.get("applicant.kitchen.selections[0]"); // returns "toaster"
```

### Play documentation

For more information, see [Java Forms with Play](https://www.playframework.com/documentation/2.8.x/JavaForms) or [Java Form Helpers](https://www.playframework.com/documentation/2.8.x/JavaFormHelpers)
