import {
	Create,
	NumberInput,
	ReferenceInput,
	required,
	SimpleForm,
	TextInput,
} from "react-admin";

export const UnitCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput validate={required()} source="title" label="Title" />
				<TextInput
					validate={required()}
					source="description"
					label="Description"
				/>
				<ReferenceInput source="courseId" reference="courses" />
				<NumberInput validate={required()} source="order" label="Order" />
			</SimpleForm>
		</Create>
	);
};
