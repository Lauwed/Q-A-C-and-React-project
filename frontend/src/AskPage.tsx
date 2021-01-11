import React from 'react';
import { Page } from './Page';
import { Form, required, minLength, Values } from './Form';
import { postQuestion } from './QuestionsData';
import { Field } from './Field';

export const AskPage = () => {
  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });

    return { success: question ? true : false };
  };
  return (
    <Page title="Ask a question">
      <div className="md:w-2/3 max-w-2xl px-6 py-10 bg-white shadow mx-auto">
        <Form
          submitCaption="Submit your question"
          validationRules={{
            title: [{ validator: required }, { validator: minLength, arg: 10 }],
            content: [
              { validator: required },
              { validator: minLength, arg: 50 },
            ],
          }}
          onSubmit={handleSubmit}
          failureMessage="There was a problem with your question"
          successMessage="Your question was successfully submitted"
        >
          <Field name="title" label="Title" />
          <Field name="content" label="Content" type="Textarea" />
        </Form>
      </div>
    </Page>
  );
};
