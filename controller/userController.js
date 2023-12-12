const CreateAUser = async (req, res) => {
  try {
    res.status(200).json({
        status : "success",
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {CreateAUser}
