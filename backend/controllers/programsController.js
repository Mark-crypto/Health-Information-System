import connection from "../database.js";

export const getPrograms = async (req, res) => {
  const pageNumber = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const offset = (pageNumber - 1) * limit;

  const limitString = limit.toString();
  const offsetString = offset.toString();

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM programs LIMIT ? OFFSET ?",
      [limitString, offsetString]
    );
    const [totalItems] = await connection.execute(
      "SELECT COUNT(*) AS total FROM programs"
    );
    const total = totalItems[0].total;

    res.status(200).json({
      data: rows,
      meta: { pageNumber, limit, totalPages: Math.ceil(total / limit), total },
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
      `SELECT * 
      FROM programs 
      WHERE program_id = ?`,
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

export const getClientsForProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute(
      `SELECT c.client_id, c.name, c.email, c.gender,c.national_id, c.phone
      FROM clients c 
      JOIN clients_in_programs cip ON cip.client_id = c.client_id
      JOIN programs p ON p.program_id = cip.program_id
      WHERE p.program_id = ?`,
      [id]
    );
    res.status(200).json({
      data: rows,
      message: "Program clients retrieved from database successfully.",
    });
  } catch (error) {
    console.log("Error fetching a program clients:", error);
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
      "INSERT INTO programs (name, case_manager, referral) VALUES(?,?,?) ",
      [name, case_manager, referral]
    );
    if (!response) {
      return res.status(400).json({
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

export const registerExistingClient = async (req, res) => {
  const { id } = req.params;
  const { clientId } = req.body;
  try {
    const response = await connection.execute(
      "INSERT INTO clients_in_programs(client_id,program_id) VALUES(?,?)",
      [clientId, id]
    );
    if (!response) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    console.log("Error adding client to program: ", error);
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
      "UPDATE programs SET name=?, case_manager=?, referral=? WHERE program_id=?",
      [name, case_manager, referral, id]
    );
    if (!response) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(200).json({ message: "Program was updated successfully." });
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
      "DELETE FROM programs WHERE program_id=?",
      [id]
    );
    if (!response) {
      res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res.status(200).json({ message: "Program was deleted successfully." });
  } catch (error) {
    console.log("Error deleting a program: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};

export const deleteClientInProgram = async (req, res) => {
  const clientId = req.params.clientId;
  const programId = req.params.id;

  try {
    const response = await connection.execute(
      "DELETE FROM clients_in_programs WHERE client_id = ? AND program_id = ?",
      [clientId, programId]
    );
    if (!response) {
      res.status(400).json({
        error: true,
        message: "Something went wrong try again later.",
      });
    }
    res
      .status(200)
      .json({ message: "Client was removed from program successfully." });
  } catch (error) {
    console.log("Error deleting a program client: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong try again later.",
    });
  }
};
export const searchClientsInProgram = async (req, res) => {
  const searchQuery = req.query.q;
  const { id } = req.params;
  try {
    if (!searchQuery)
      return res.status(400).json({ message: "No input was passed" });
    const [rows] = await connection.execute(
      `WITH join_table AS(
      SELECT c.name AS client_name, c.email, c.gender,c.national_id, c.phone
      FROM clients c 
      JOIN clients_in_programs cip ON cip.client_id = c.client_id
      JOIN programs p ON p.program_id = cip.program_id
      WHERE p.program_id = ?) 
      SELECT * FROM join_table
      WHERE MATCH(client_name) AGAINST(?) LIMIT 10
      `,
      [id, searchQuery]
    );
    res
      .status(200)
      .json({ data: rows, message: "Programs retrieved successfully." });
  } catch (error) {
    console.log("Error searching for programs: ", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong. Try again later.",
    });
  }
};
