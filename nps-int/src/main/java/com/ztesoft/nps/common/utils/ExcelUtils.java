package com.ztesoft.nps.common.utils;

import com.ztesoft.nps.common.exception.NpsBusinessException;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.PushbackInputStream;

/**
 * Created by 64671 on 2018/8/28.
 */
public class ExcelUtils {

    public static Workbook create(MultipartFile file){
        String fileName = file.getOriginalFilename();
        if (!fileName.matches("^.+\\.(?i)(xls)$") && !fileName.matches("^.+\\.(?i)(xlsx)$")) {
            throw new NpsBusinessException(ConstantUtils.EXPORT_FILE_NOT_ALLOWED);
        }

        boolean isExcel2003 = true;
        if (fileName.matches("^.+\\.(?i)(xlsx)$")) {
            isExcel2003 = false;
        }

        Workbook wb = null;
        try{
            InputStream is = file.getInputStream();
            if (isExcel2003) {
                wb = new HSSFWorkbook(is);
            } else {
                wb = new XSSFWorkbook(is);
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        return wb;
    }

}
