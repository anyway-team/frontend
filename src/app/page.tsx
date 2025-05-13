import { Badge } from "@/components/ui/badge";
import { Nav } from "../components/ui/nav";
import styles from "./page.module.css";
import { TodayNewsSection } from "../components/today-news/today-news-section";
import { Spacing } from "../components/ui/spacing";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />
      <div className="flex flex-row items-center gap-3 w-full overflow-x-auto whitespace-nowrap py-2 no-scrollbar">
        {
          new Array(10).fill(0).map((_, index) => (
            <Badge variant="outline" key={index} className="w-16 h-8 inline-block flex items-center justify-center">
              키워드 {index}
            </Badge>
          ))
        }
      </div>
      <Spacing />
      <TodayNewsSection />
    </div>
  );
}
