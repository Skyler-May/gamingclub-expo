import { modalPages, PageData } from "@/types/modalSubPages";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "react-native-paper";
import GameplayGrid from "./GameplayGrid";

// 使用从pageData导入的PageData接口

interface GameplayToggleProps {
  buttonTitle?: string;
  modalTitle?: string;
  pages?: PageData[];
  itemsPerRow?: number;
  buttonProps?: Omit<TouchableOpacityProps, "onPress">;
  onPageSelect?: (pageId: number) => void;
  renderContent?: (currentPage: number | null) => React.ReactNode;
}

const GameplayToggle: React.FC<GameplayToggleProps> = ({
  buttonTitle = "打开模态",
  modalTitle = "模态标题",
  pages = modalPages, // 默认使用导入的modalPages
  itemsPerRow = 4,
  buttonProps,
  onPageSelect,
  renderContent,
}) => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [currentButtonTitle, setCurrentButtonTitle] = useState(buttonTitle);
  const theme = useTheme();

  // 根据当前页面ID更新按钮标题
  useEffect(() => {
    // 初始化时，如果有传入的currentPage，则使用它
    if (onPageSelect && currentPage === null) {
      // 查找第一个页面作为默认页面
      if (pages.length > 0) {
        const defaultPage = pages[0];
        setCurrentPage(defaultPage.id);
        setCurrentButtonTitle(`页面：${defaultPage.title}`);
      }
    } else if (currentPage === null) {
      setCurrentButtonTitle(buttonTitle);
    } else {
      const selectedPage = pages.find((page) => page.id === currentPage);
      if (selectedPage) {
        setCurrentButtonTitle(`页面：${selectedPage.title}`);
      }
    }
  }, [currentPage, pages, buttonTitle, onPageSelect]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // 处理页面选择
  const handlePageSelect = (pageId: number) => {
    setCurrentPage(pageId);
    hideModal();
    if (onPageSelect) {
      onPageSelect(pageId);
    }
  };

  // 处理页面数据
  const processedPages = pages.map((page) => ({
    ...page,
    onPress: () => handlePageSelect(page.id),
  }));

  const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      borderColor: theme.colors.primary, // #2196F3
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: theme.colors.primary, // #2196F3
      fontSize: 14,
      textAlign: "center",
    },
  });

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        style={styles.button}
        {...buttonProps}
      >
        <Text style={styles.buttonText}>{currentButtonTitle}</Text>
      </TouchableOpacity>
      <GameplayGrid
        visible={visible}
        hideModal={hideModal}
        title={modalTitle}
        pages={processedPages}
        itemsPerRow={itemsPerRow}
      />

      {renderContent && currentPage !== null && renderContent(currentPage)}
    </>
  );
};

export default GameplayToggle;
