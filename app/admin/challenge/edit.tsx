import {
	Edit,
	NumberInput,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	TextInput,
} from "react-admin";

export const ChallengeEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput validate={required()} source="question" label="Question" />
				<SelectInput
					validate={required()}
					source="type"
					choices={[
						{
							id: "SELECT",
							name: "SELECT",
						},
						{
							id: "ASSIST",
							name: "ASSIST",
						},
					]}
				/>
				<ReferenceInput source="lessonId" reference="lessons" />
				<NumberInput validate={required()} source="order" label="Order" />
			</SimpleForm>
		</Edit>
	);
};
