import DragLabel from "./components/DragLabel";
import DragTextinput from "./components/DragTextinput";
import DragTexarea from "./components/DragTexarea";
import DragSelect from "./components/DragSelect";
import DragCheckbox from "./components/DragCheckbox";
import DragButton from "./components/DragButton";
import DragPanel from "./components/DragPanel";
import { Components } from "./Constants.js";

const buildComponent = (item, index) => {
    let ret = null;
  
    switch (item.type) {
      case Components.types.panel:
        ret = <DragPanel key={item.id} id={item.id} index={index} value={item.value} />;
        break;
      case Components.types.label:
        ret = <DragLabel key={item.id} id={item.id} index={index} value={item.value} />;
        break;
      case Components.types.textInput:
        ret = <DragTextinput key={item.id} id={item.id} index={index} value={item.value} />;
        break;
      case Components.types.textArea:
        ret = <DragTexarea key={item.id} id={item.id} index={index} value={item.value} />;
        break;
      case Components.types.select:
        ret = <DragSelect key={item.id} id={item.id} index={index} value={item.value} />;
        break;
      case Components.types.checkbox:
        ret = <DragCheckbox key={item.id} id={item.id} index={index} value={item.value} />;
        break;
      case Components.types.button:
        ret = <DragButton key={item.id} id={item.id} index={index} value={item.value} />;
        break;
  
      default:
        break;
    }
    // ret = <DragComponent key={item.id} id={item.id} index={index} value={item.value} />;
    return ret;
  };

  export {buildComponent}