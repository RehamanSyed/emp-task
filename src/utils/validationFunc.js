export function validateFunc(formData) {
  //   console.log("Form Data", formData);
  if (formData.age <= 18 || formData.age > 100) {
    return {
      type: "age",
      message: "Age should be between Name 18 and 99",
      success: false,
    };
  }
  if (!/^[a-zA-Z ]*$/.test(formData.name)) {
    return {
      type: "name",
      message: "invalid name",
      success: false,
    };
  }
  if (!/^[1-9]\d*$/.test(formData.salary)) {
    return {
      type: "salary",
      message: "Invalid salary",
      success: false,
    };
  }
  return {
    message: null,
    success: true,
  };
}
