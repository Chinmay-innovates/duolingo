import {
	Create,
	NumberInput,
	ReferenceInput,
	required,
	SimpleForm,
	TextInput,
} from "react-admin";

export const LessonCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput validate={required()} source="title" label="Title" />
				<ReferenceInput source="unitId" reference="units" />
				<NumberInput validate={required()} source="order" label="Order" />
			</SimpleForm>
		</Create>
	);
};
