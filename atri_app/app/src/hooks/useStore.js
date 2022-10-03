import create from "zustand";

// unsafe merge state
// and mew properties will added or existing properties will be changed
// but the type of value of the property must not change
function mergeState(baseState, newState) {
  if (
    typeof newState === "object" &&
    !Array.isArray(newState) &&
    newState !== null
  ) {
    const keys = Object.keys(newState);
    keys.forEach((key) => {
      // create a new key in base if not exists
      if (!(key in baseState)) {
        baseState[key] = {};
      }
      if (typeof newState[key] === "object" && !Array.isArray(newState[key]))
        mergeState(baseState[key], newState[key]);
      else baseState[key] = newState[key];
    });
  }
}

const useStore = create((set) => {
  return {
    setPage: (pageName, newState) =>
      set((state) => {
        const pageState = JSON.parse(JSON.stringify(state[pageName]));
        mergeState(pageState, newState);
        return { [pageName]: pageState };
      }),
  };
});

export function updateStoreStateFromController(pageName, newState) {
  useStore.getState().setPage(pageName, newState);
}

const desktopModeProps = {
  ...{
  "Home": {
    "Flex1": {
      "styles": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "paddingTop": "25px",
        "paddingBottom": "25px",
        "backgroundColor": "#f3f3f3"
      },
      "callbacks": {}
    },
    "TextBox1": {
      "styles": {
        "fontSize": "32px"
      },
      "custom": {
        "text": "Code Snippet Generator"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Flex2": {
      "styles": {
        "display": "flex",
        "paddingTop": "100px",
        "alignItems": "center",
        "justifyContent": "center",
        "paddingBottom": "40px",
        "flexDirection": "column",
        "rowGap": "40px"
      },
      "callbacks": {}
    },
    "Input1": {
      "styles": {
        "boxSizing": "border-box",
        "fontVariant": "tabular-nums",
        "fontFeatureSettings": "tnum",
        "paddingTop": "4px",
        "paddingLeft": "11px",
        "paddingBottom": "4px",
        "paddingRight": "11px",
        "color": "#000000d9",
        "fontSize": "14px",
        "backgroundColor": "#f3f3f3",
        "backgroundImage": "none",
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": "#d9d9d9",
        "borderRadius": "2px",
        "width": "60%",
        "height": "50vh",
        "alignSelf": "center",
        "textAlign": "left",
        "wordWrap": "normal"
      },
      "custom": {
        "value": "",
        "placeholder": "Enter Your Code Here ...."
      },
      "callbacks": {}
    },
    "Flex3": {
      "styles": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "paddingBottom": "100px",
        "flexDirection": "column",
        "rowGap": "40px"
      },
      "callbacks": {}
    },
    "Image1": {
      "styles": {
        "width": "60%"
      },
      "custom": {
        "alt": "No preview available"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Button1": {
      "styles": {
        "color": "#000000",
        "backgroundColor": "#f3f3f3",
        "paddingTop": "15px",
        "paddingLeft": "15px",
        "paddingBottom": "15px",
        "paddingRight": "15px",
        "fontSize": "16px",
        "borderRadius": "2px",
        "outline": "none",
        "fontWeight": 400,
        "textAlign": "center",
        "borderWidth": "1px",
        "borderStyle": "none",
        "borderColor": "#1890ff",
        "cursor": "pointer",
        "userSelect": "none"
      },
      "custom": {
        "text": "Generate Snippet"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Flex4": {
      "styles": {
        "display": "flex",
        "width": "100%",
        "alignItems": "center",
        "justifyContent": "center",
        "columnGap": "50px"
      },
      "callbacks": {}
    },
    "Dropdown1": {
      "styles": {},
      "custom": {
        "values": [],
        "displayedValues": []
      },
      "callbacks": {}
    },
    "Dropdown2": {
      "styles": {},
      "custom": {
        "values": []
      },
      "callbacks": {}
    },
    "Flex6": {
      "styles": {
        "display": "flex",
        "columnGap": "100px"
      },
      "callbacks": {}
    },
    "Button2": {
      "styles": {
        "color": "#000000",
        "backgroundColor": "#f3f3f3",
        "paddingTop": "15px",
        "paddingLeft": "15px",
        "paddingBottom": "15px",
        "paddingRight": "15px",
        "fontSize": "16px",
        "borderRadius": "2px",
        "outline": "none",
        "fontWeight": 400,
        "textAlign": "center",
        "borderWidth": "1px",
        "borderStyle": "none",
        "borderColor": "#1890ff",
        "cursor": "pointer",
        "userSelect": "none"
      },
      "custom": {
        "text": "Download as JPEG"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    },
    "Button3": {
      "styles": {
        "color": "#000000",
        "backgroundColor": "#f3f3f3",
        "paddingTop": "15px",
        "paddingLeft": "15px",
        "paddingBottom": "15px",
        "paddingRight": "15px",
        "fontSize": "16px",
        "borderRadius": "2px",
        "outline": "none",
        "fontWeight": 400,
        "textAlign": "center",
        "borderWidth": "1px",
        "borderStyle": "none",
        "borderColor": "#1890ff",
        "cursor": "pointer",
        "userSelect": "none"
      },
      "custom": {
        "text": "Download as PNG"
      },
      "callbacks": {
        "onClick": [
          {
            "sendEventData": true
          }
        ]
      }
    }
  }
}};

const breakpointProps = {
  ...{
  "Home": {}
}};

function getViewportDimension() {
  const width = Math.min(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const height = Math.min(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  return { width, height };
}

function getEffectiveBreakpointWidths(pageName, windowWidth) {
  if (breakpointProps[pageName] === undefined) {
    return [];
  }
  const widths = Object.keys(breakpointProps[pageName]);
  return widths
    .filter((curr) => {
      return parseInt(curr) >= windowWidth;
    })
    .sort((a, b) => {
      return parseInt(b) - parseInt(a);
    });
}

/**
 *
 * effective props is combination of
 */
function getEffectivePropsForPage(pageName) {
  const { width } = getViewportDimension();
  // effectiveProps initially has local changes
  let effectiveProps = JSON.parse(
    JSON.stringify(useStore.getState()[pageName])
  );
  const effectiveWidths = getEffectiveBreakpointWidths(pageName, width);
  effectiveWidths.forEach((effectiveWidth) => {
    const compAliases = Object.keys(breakpointProps[pageName][effectiveWidth]);
    compAliases.forEach((compAlias) => {
      const propNames = Object.keys(
        breakpointProps[pageName][effectiveWidth][compAlias]
      );
      propNames.forEach((propName) => {
        effectiveProps[compAlias][propName] = {
          ...useStore.getState()[pageName][compAlias][propName],
          ...breakpointProps[pageName][effectiveWidth][compAlias][propName],
        };
      });
    });
  });
  return effectiveProps;
}

export function setEffectivePropsForPage(pageName) {
  const effectiveProps = getEffectivePropsForPage(pageName);
  useStore.getState().setPage(pageName, effectiveProps);
}

useStore.setState(desktopModeProps);

export default useStore;
