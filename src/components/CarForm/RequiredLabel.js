export default function Required({ text }) {
    return (
      <span title={`${text} is required`}>
          {text}<i className="text-danger">*</i>
      </span>
    );
};