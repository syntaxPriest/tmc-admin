export function colorEncoder(status: string) {
  const statusInLowerCase = status.toLowerCase();
  switch (statusInLowerCase) {
    case "successful":
    case "success":
    case "active":
    case "complete":
    case "completed":
    case "open":
    case "in_stock":
    case "credit":
      return {
        bg: "#ECFDF3",
        color: "#067647",
        border: "#ABEFC6",
      };

    // New Check Line
    case "failed": 
    case "closed":
    case "out_of_stock":
    case "cancelled":
    case "debit":
      return {
        bg: "#FEF3F2",
        color: "#B42318",
        border: "#FECDCA",
      };

    // New Check Line
    case "low_stock":
    case "processing":
    case "pending":
      return {
        bg: "#FEF3F2",
        color: "#8B6C23",
        border: "#EBD7AD",
      };
    default:
      break;
  }
}
