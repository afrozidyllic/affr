const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  item: String,
  fullName: String,
  rawCandidate: Object,
  contacts: Array,
  social: Array,
  receivedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Candidate", CandidateSchema);
