using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace ConsoleApp1
{
    public class FileTreeHelper
    {
        static void Main()
        {
            var rootReadme = "./README.md";
            //if (!string.IsNullOrEmpty(path))
            //{
            //    Directory.SetCurrentDirectory(path);
            //}
            var mdDatas = ScanMdData();

            using (var fs = new StreamWriter(rootReadme))
            {
                foreach (var data in mdDatas)
                {
                    fs.WriteLine(data);
                }
            }
        }

        public static List<string> ScanMdData()
        {
            var mdFiles = Directory.GetFiles("./", "*.md", searchOption: SearchOption.AllDirectories)
                .Select(x => x.Replace('\\', '/')).ToList();
            SortFiles(mdFiles);

            var mdDatas = new List<string>();
            foreach (var mdFile in mdFiles)
            {
                var depth = Regex.Matches(mdFile, "/").Count - 1;
                if (depth < 1)
                {
                    continue;
                }

                var directories = mdFile[1..].Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)[..^1];
                for (int i = 0; i < directories.Length; i++)
                {
                    string dire = directories[i];
                    // "".PadRight(i + 1, '#');
                    var titleData = $"{new string('#', i + 1)} {dire.Replace(" ", "%20")}";
                    if (!mdDatas.Contains(titleData))
                    {
                        mdDatas.Add(titleData);
                    }
                }
                mdDatas.Add($"[{Path.GetFileName(mdFile)}]({mdFile.Replace(" ", "%20")})");
            }

            return mdDatas;
        }

        public static void SortFiles(List<string> mdFiles)
        {
            mdFiles.Sort();
            for (int i = mdFiles.Count - 1; i >= 0; i--)
            {
                var dirName = Path.GetDirectoryName(mdFiles[i]).Replace('\\', '/');
                var depth = Regex.Matches(mdFiles[i], "/").Count;
                for (var j = 0; j < i; j++)
                {
                    if (mdFiles[j].StartsWith(dirName)
                        && Regex.Matches(mdFiles[j], "/").Count > depth)
                    {
                        var tempI = mdFiles[i];
                        mdFiles.RemoveAt(i);
                        mdFiles.Insert(j, tempI);
                        i++;
                        break;
                    }
                }
            }
        }
    }
}
