import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { Key } from "@react-types/shared";
import { ReactNode, useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { LIMIT_LIST } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import useChangeUrl from "@/hooks/useChangeUrls";

interface ColumnType {
  uid: string;
  name: string;
}

interface PropsTypes {
  buttonTopContentLabel?: string;
  columns: ColumnType[];
  data: Record<string, unknown>[];
  emptyContent: string | React.ReactNode;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  onDeleteSelected?: (ids: string[]) => void; // ➝ tambahan prop untuk hapus
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
  showLimit?: boolean;
  showSearch?: boolean;
  withSelection?: boolean;
  dropdownContent?: ReactNode;
  totalEntries?: number;
  searchName?: string;
}

const DataTable = (props: PropsTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangePage,
    handleChangeLimit,
    handleClearSearch,
    handleSearch,
  } = useChangeUrl();

  const {
    buttonTopContentLabel,
    columns,
    emptyContent,
    data,
    isLoading,
    onClickButtonTopContent,
    onDeleteSelected,
    renderCell,
    totalPages,
    showLimit = true,
    totalEntries,
    showSearch = true,
    withSelection = false,
    dropdownContent,
    searchName = "Cari generus...",
  } = props;

  // state untuk baris yang dipilih
  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(new Set());

  const topContent = useMemo(() => {
    const hasActions =
      (withSelection &&
        ((selectedKeys !== "all" && (selectedKeys as Set<Key>).size > 0) ||
          selectedKeys === "all")) ||
      !!buttonTopContentLabel;

    if (!showSearch && !hasActions) return null; // kalau kosong, jangan render apapun

    return (
      <div className="flex flex-col gap-4 rounded-xl bg-white/80 backdrop-blur-md p-5 shadow-sm border border-gray-100">
        {/* Bagian atas: filter + create button */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* Kiri: search + filter */}
          <div className="flex flex-wrap items-end gap-3 w-full sm:w-auto">
            {showSearch && (
              <div className="relative w-full sm:w-64">
                <Input
                  isClearable
                  startContent={<Search />}
                  placeholder={searchName}
                  className="w-full"
                  onClear={handleClearSearch}
                  onChange={handleSearch}
                />
              </div>
            )}
            {/* Dropdown/filter tambahan */}
            {dropdownContent && (
              <div className="flex flex-wrap items-end gap-3">
                {dropdownContent}
              </div>
            )}
          </div>

          {/* Kanan: tombol aksi utama */}
          {buttonTopContentLabel && (
            <div className="flex justify-end">
              <Button
                color="primary"
                size="md"
                className="font-medium shadow-sm"
                onPress={onClickButtonTopContent}
              >
                {buttonTopContentLabel}
              </Button>
            </div>
          )}
        </div>

        {/* Bagian bawah: aksi bulk delete */}
        {withSelection && (
          <div className="flex flex-wrap items-center gap-2">
            {selectedKeys !== "all" && (selectedKeys as Set<Key>).size > 0 && (
              <Button
                color="danger"
                variant="flat"
                startContent={<Trash2 size={16} />}
                onPress={() =>
                  onDeleteSelected?.(
                    Array.from(selectedKeys as Set<Key>) as string[],
                  )
                }
              >
                Delete ({(selectedKeys as Set<Key>).size})
              </Button>
            )}
            {selectedKeys === "all" && (
              <Button
                color="danger"
                variant="flat"
                startContent={<Trash2 size={16} />}
                onPress={() =>
                  onDeleteSelected?.(data.map((item) => item._id as string))
                }
              >
                Delete All
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }, [
    withSelection,
    selectedKeys,
    buttonTopContentLabel,
    showSearch,
    searchName,
    handleClearSearch,
    handleSearch,
    dropdownContent,
    onClickButtonTopContent,
    onDeleteSelected,
    data,
  ]);

  const ButtomContent = useMemo(() => {
    const startEntry = (Number(currentPage) - 1) * Number(currentLimit) + 1;
    const endEntry = Math.min(
      Number(currentPage) * Number(currentLimit),
      data.length,
    );
    return (
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
        {/* Bagian Show Limit dan Info Entries */}
        <div className="flex items-center gap-4 w-full">
          {showLimit && (
            <Select
              className="max-w-36"
              size="md"
              selectedKeys={[`${currentLimit}`]}
              selectionMode="single"
              onChange={handleChangeLimit}
              startContent={
                <span className="text-sm font-medium mr-2">Show:</span>
              }
              disallowEmptySelection
            >
              {LIMIT_LIST.map((item) => (
                <SelectItem key={item.value}>{item.label}</SelectItem>
              ))}
            </Select>
          )}

          <span className="text-gray-700 text-sm">
            Showing{" "}
            <span className="font-medium">
              {startEntry}-{endEntry}
            </span>{" "}
            of{" "}
            <span className="font-medium">{totalEntries ?? data.length}</span>{" "}
            entries
          </span>
        </div>

        {/* Bagian Pagination */}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="primary"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    currentPage,
    currentLimit,
    data.length,
    showLimit,
    handleChangeLimit,
    totalEntries,
    totalPages,
    handleChangePage,
  ]);

  return (
    <Table
      selectionMode={withSelection ? "multiple" : "none"}
      selectedKeys={withSelection ? selectedKeys : undefined}
      onSelectionChange={withSelection ? setSelectedKeys : undefined}
      bottomContent={ButtomContent}
      bottomContentPlacement="outside"
      topContentPlacement="outside"
      topContent={topContent}
      classNames={{
        base: "max-full ",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
        td: "whitespace-nowrap overflow-hidden text-ellipsis border-b border-gray-200", // ⬅️ supaya isi cell tetap 1 baris
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={isLoading ? [] : data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
