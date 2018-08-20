import React from "react";
import Downshift from "downshift";
import matchSorter from "match-sorter";

const itemToString = item => (item ? item : "");

const DownshiftInput = ({
  input,
  meta,
  placeholder,
  items,
  onKeyDown,
  ...rest
}) => (
  <Downshift
    {...input}
    onInputValueChange={inputValue => {
      input.onChange(inputValue);
    }}
    itemToString={itemToString}
    selectedItem={input.value}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem
    }) => {
      const filteredItems = matchSorter(items, inputValue, {
        keys: ["title"],
        maxRanking: matchSorter.rankings.STARTS_WITH
      });
      return (
        <div className="downshift" style={{ position: "relative" }}>
          <input
            {...getInputProps({
              name: input.name,
              placeholder
            })}
            onKeyDown={onKeyDown}
          />
          {isOpen &&
            !!filteredItems.length && (
              <div
                className="downshift-options"
                style={{
                  background: "white",
                  position: "absolute",
                  top: "100%",
                  left: 15,
                  right: 0,
                  zIndex: 4
                }}
              >
                {console.log(filteredItems)}
                {filteredItems.map(({ title, objectID }, index) => (
                  <div
                    {...getItemProps({
                      key: objectID,
                      index,
                      item: title,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === title ? "bold" : "normal"
                      }
                    })}
                  >
                    {title}
                  </div>
                ))}
              </div>
            )}
        </div>
      );
    }}
  </Downshift>
);

export default DownshiftInput;
