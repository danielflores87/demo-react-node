import  ButtonsCardComponent  from "./buttons-card.component";
import { ContentCardComponent } from "./content-card.component";
import { GridCardComponent } from "./grid-card.component";

function PageBaseComponent({ children, className }) {
  return <div className={`${className} p-5`}>{children}</div>;
}

export const PageComponent = Object.assign(PageBaseComponent, {
  ContentCard: ContentCardComponent,
  GridCard: GridCardComponent,
  ButtonsCard: ButtonsCardComponent,

});
