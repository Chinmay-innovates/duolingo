import { Create, required, SimpleForm, TextInput } from "react-admin";

export const CourseCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput validate={required()} source="title" label="Title" />
				<TextInput validate={required()} source="imageSrc" label="Image" />
			</SimpleForm>
		</Create>
	);
};
