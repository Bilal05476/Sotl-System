export default function sampleUsers() {
  const data = [];
  // Create 25 Faculty objects
  for (let i = 1; i <= 25; i++) {
    data.push({
      name: `Faculty${i}`,
      email: `faculty${i}@iqra.edu.pk`,
      password: "12345678",
      campus: "Main_Campus",
      role: "Faculty",
      department: i < 15 ? 1 : 2,
    });
  }

  // Create 10 Observer objects
  for (let i = 1; i <= 10; i++) {
    data.push({
      name: `Observer${i}`,
      email: `observer${i}@iqra.edu.pk`,
      password: "12345678",
      campus: "Main_Campus",
      role: "Observer",
      department: i < 6 ? 1 : 2,
    });
  }

  // Create 5 Head_of_Department objects
  for (let i = 1; i <= 5; i++) {
    data.push({
      name: `Head_of_Department${i}`,
      email: `hod${i}@iqra.edu.pk`,
      password: "12345678",
      campus: "Main_Campus",
      role: "Head_of_Department",
      department: i,
    });
  }

  return data;
}
