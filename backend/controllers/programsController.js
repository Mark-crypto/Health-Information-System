import connection from "../database.js";
//remember pagination and search
export const getPrograms = async (req, res) => {
  const { _limit } = req.query;
  const { _page } = req.query;

  const page = 1;
  const limit = 10;
  const offset = 0;

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM programs LIMIT 10",
      []
    );
    res.status(200).json({
      data: rows,
      message: "Programs retrieved from database successfully.",
    });
  } catch (error) {
    console.log("Error fetching programs:", error);
    res
      .status(500)
      .json({ error: true, message: "Something went wrong try again later." });
  }
};
export const getSingleProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM programs WHERE program_id = ?",
      [id]
    );
    res.status(200).json({
      data: rows[0],
      message: "Program retrieved from database successfully.",
    });
  } catch (error) {
    console.log("Error fetching a program:", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const createProgram = async (req, res) => {
  const { name, case_manager, referral } = req.body;
  try {
    const response = await connection.execute(
      "INSERT INTO programs SET name=? case_manager=? referral=?",
      [name, case_manager, referral]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Program was created successfully." });
  } catch (error) {
    console.log("Error creating a program: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const updateProgram = async (req, res) => {
  const { name, case_manager, referral } = req.body;
  const { id } = req.params;
  try {
    const response = await connection.execute(
      "UPDATE programs SET name=? case_manager=? referral=? WHERE program_id=?",
      [name, case_manager, referral, id]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Program was updated successfully." });
  } catch (error) {
    console.log("Error updating a program: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const deleteProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await connection.execute(
      "DELETE FROM programs WHERE program_id=",
      [id]
    );
    if (!response) {
      res.status(500).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Program was deleted successfully." });
  } catch (error) {
    console.log("Error deleting a program: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};

export const searchProgram = (req, res) => {
  const { q } = req.query;
};
