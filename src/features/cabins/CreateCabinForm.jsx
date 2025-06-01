import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ editCabin = {}, onCloseModal }) {
  const { id: editedCabinId, ...cabinValues } = editCabin;
  const isEditingSession = Boolean(editedCabinId);

  const { handleSubmit, register, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession ? cabinValues : {},
  });
  const { errors } = formState;

  // Create a new cabin
  const { isCreating, createCabin } = useCreateCabin();
  // Edit an existing cabin
  const { isEditing, editedCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const newCabin = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      regularPrice: Number(data.regularPrice),
      discount: Number(data.discount),
      image,
    };
    if (!isEditingSession) {
      createCabin(newCabin, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } else {
      editedCabin(
        {
          editedCabin: newCabin,
          editedCabinId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label='name' error={errors.name?.message}>
        <Input
          type='text'
          disabled={isWorking}
          id='name'
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors.maxCapacity?.message}>
        <Input
          type='number'
          disabled={isWorking}
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors.regularPrice?.message}>
        <Input
          type='number'
          disabled={isWorking}
          id='regularPrice'
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors.discount?.message}>
        <Input
          type='number'
          disabled={isWorking}
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors.description?.message}
      >
        <Textarea
          type='number'
          disabled={isWorking}
          id='description'
          defaultValue=''
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors.cabinDescription?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: isEditingSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingSession ? "Edit cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
