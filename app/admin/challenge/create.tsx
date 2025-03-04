import {
	Create,
	NumberInput,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
} from "react-admin";

export const ChallengeCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextField source="id" />
				<TextInput validate={required()} source="question" label="Question" />
				<SelectInput
					validate={required()}
					source="type"
					choices={[
						{
							id: "SELECT",
							name: "Select",
						},
						{
							id: "ASSIST",
							name: "Assist",
						},
					]}
				/>
				<ReferenceInput source="lessonId" reference="lessons" />
				<NumberInput validate={required()} source="order" label="Order" />
			</SimpleForm>
		</Create>
	);
};
