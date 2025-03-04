import {
	Edit,
	NumberInput,
	ReferenceInput,
	required,
	SimpleForm,
	TextInput,
} from "react-admin";

export const UnitEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<NumberInput validate={required()} source="id" label="Id" />
				<TextInput validate={required()} source="title" label="Title" />
				<TextInput
					validate={required()}
					source="description"
					label="Description"
				/>
				<ReferenceInput source="courseId" reference="courses" />
				<NumberInput validate={required()} source="order" label="Order" />
			</SimpleForm>
		</Edit>
	);
};
