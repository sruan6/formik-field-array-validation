import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Debug } from "./Debug";

const initialValues = {
  friends: [
    {
      name: "",
      email: ""
    }
  ]
};

const App = () => (
  <div className="bg-blue-400 px-10 py-10">
    <div
      className="m-auto bg-white rounded px-10 py-10 shadow-lg"
      style={{ width: 600 }}
    >
      <h1 className="text-4xl font-bold mb-5 text-center text-orange-400">INVITE FRIENDS</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          friends: Yup.array()
            .of(
              Yup.object({
                name: Yup.string()
                  .min(5, "Username too short")
                  .required("Required"),
                email: Yup.string()
                  .email("Invalid email")
                  .required("Please choose a password")
              })
            )
            .min(3, "Must invite at least three friends")
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 2000);
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (
            <Form>
              <FieldArray name="friends">
                {({ push, remove }) => (
                  <React.Fragment>
                    {values.friends &&
                      values.friends.length > 0 &&
                      values.friends.map((_friend, index) => (
                        <div key={index} className="flex mb-3">
                          <div className="flex-1 flex flex-col">
                            <Field
                              name={`friends[${index}].name`}
                              type="text"
                              placeholder="Jane Doe"
                              className="px-2 py-3 mr-3 border-solid border-grey-light border-2 rounded"
                            />
                            <ErrorMessage name={`friends[${index}].name`}>
                              {msg => (
                                <div className="p-2 text-red-dark">{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <Field
                              name={`friends[${index}].email`}
                              type="email"
                              placeholder="jane@example.com"
                              className="px-2 py-3 mr-3 border-solid border-grey-light border-2 rounded"
                            />
                            <ErrorMessage name={`friends[${index}].email`}>
                              {msg => (
                                <div className="p-2 text-red-dark">{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="w-8 h-8 rounded bg-red-600"
                            style={{ marginTop: 7 }}
                          >
                            X
                          </button>
                        </div>
                      ))}

                    <button
                      type="button"
                      onClick={() => push({ name: "", email: "" })}
                      className="w-full p-3 mb-3 text-xl uppercase font-bold shadow-md rounded bg-green-400"
                    >
                      Add Friend
                    </button>
                  </React.Fragment>
                )}
              </FieldArray>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-3 mb-3 text-xl uppercase font-bold shadow-md rounded text-black ${
                  isSubmitting ? "bg-grey" : "bg-green"
                }`}
              >
                Invite
              </button>

              <div className="p-2 text-center text-red-400">
                {typeof errors.friends === "string" ? errors.friends : null}
              </div>
              <Debug />
            </Form>
          );
        }}
      </Formik>
    </div>
  </div>
);

export default App;
