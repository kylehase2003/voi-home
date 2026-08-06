import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ReactNode } from "react";
interface LanguageTabsProps {
  children: (language: "en" | "ar" | "ru") => ReactNode;
  filledLanguages?: {
    en?: boolean;
    ar?: boolean;
    ru?: boolean;
  };
}
export const LanguageTabs = ({
  children,
  filledLanguages = {}
}: LanguageTabsProps) => {
  return <Tabs defaultValue="en" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="en" className="relative">
          English
          {filledLanguages.en && <Badge variant="default" className="ml-2 h-5 w-5 p-0 rounded-full justify-center ">
              <Check className="h-3 w-3" />
            </Badge>}
        </TabsTrigger>
        <TabsTrigger value="ar" className="relative">
          العربية
          {filledLanguages.ar && <Badge variant="default" className="ml-2 h-5 w-5 p-0 rounded-full  justify-center ">
              <Check className="h-3 w-3 justify-center " />
            </Badge>}
        </TabsTrigger>
        <TabsTrigger value="ru" className="relative">
          Русский
          {filledLanguages.ru && <Badge variant="default" className="ml-2 h-5 w-5 p-0 rounded-full  justify-center ">
              <Check className="h-3 w-3  justify-center " />
            </Badge>}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="en">{children("en")}</TabsContent>
      <TabsContent value="ar">{children("ar")}</TabsContent>
      <TabsContent value="ru">{children("ru")}</TabsContent>
    </Tabs>;
};