import { Card, CardHeader } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";

export default function AccountCard(user: User | null) {
  return (
    <Card>
      <CardHeader></CardHeader>
    </Card>
  );
}
