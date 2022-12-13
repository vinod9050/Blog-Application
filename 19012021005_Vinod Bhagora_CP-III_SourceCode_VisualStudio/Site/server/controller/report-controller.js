import Report from "../model/report.js";
import Post from "../model/post.js";
import User from "../model/user.js";

export const addReport = (req, res) => {
  const report = new Report({ post: req.params.postId, user: req.user._id });
  report.save((err, report) => {
    if (err) {
      return res.status(400).json({ msg: "unable to save " });
    }
    return res.status(200).json({ msg: "report added successfully" });
  });
};

export const getReport = (req, res) => {
  return res.status(200).json(req.user);
};

export const getReports = (req, res) => {
  Report.find().exec((err, reports) => {
    if (err) {
      return res.status(400).json({ msg: "No reports found!" });
    }
    return res.status(200).json(reports);
  });
};

export const deleteReport = (req, res) => {
  Report.remove({ _id: req.params.reportId }, (err, result) => {
    if (err) {
      return res.status(400).json({ msg: "Unable to delete report!" });
    }
    return res.status(200).json({ msg: "Deleted Successfully!" });
  });
};

export const getAllReports = (req, res) => {
  Report.find()
    .populate("user post")
    .exec((err, reports) => {
      if (err) {
        return res.status(400).json({ err });
      }

      return res.status(200).json(reports);
    });
};
