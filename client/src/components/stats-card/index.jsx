import { Card } from "../ui/card";

function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = false,
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card
      className={`p-6 hover:shadow-elegant transition-all duration-300 group cursor-pointer ${
        gradient ? "bg-gradient-card" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <p className="text-2xl font-heading font-bold text-foreground">
              {value}
            </p>
            {change && (
              <p className={`text-xs font-medium ${getChangeColor()}`}>
                {change}
              </p>
            )}
          </div>
        </div>

        <div
          className={`p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
            gradient
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground group-hover:text-primary"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

export default StatsCard;
