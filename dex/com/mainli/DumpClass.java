package com.mainli;

import java.io.Closeable;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class DumpClass {
    public static void pullClass(String name) {
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        String classPath = name.replace('.', '/') + ".class";
        InputStream in = null;
        OutputStream out = null;
        try {
            in = loader.getResourceAsStream(classPath);
            File file = new File("/sdcard/class");
            file.mkdirs();
            out = new FileOutputStream(new File(file, name + ".class"));
            out.write(in.readNBytes(in.available()));
        } catch (IOException e) {
        } finally {
            close(out, in);
        }
    }

    private static void close(Closeable... closeable) {
        for (int i = 0; i < closeable.length; i++) {
            if (closeable[i] != null) {
                try {
                    closeable[i].close();
                } catch (Exception e) {
                    //ignore
                }
            }
        }
    }
}