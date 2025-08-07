﻿using System.Data;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.Xml;
using Microsoft.Data.SqlClient;


namespace API.Shared
{
    public class DBXmlMethods
    {
        public static XDocument GetXml<T>(T criterio)
        {
            /*XDocument resultado = new XDocument(new XDeclaration("1.0", "utf-8", "true"));
            try
            {
                XmlSerializer xs = new XmlSerializer(typeof(T));
                using XmlWriter xw = resultado.CreateWriter();
                xs.Serialize(xw, criterio);
                return resultado;
            }
            catch (Exception ex)
            {
                return null;
            }*/

            try
            {
                XmlSerializer xs = new XmlSerializer(typeof(T));
                using StringWriter stringWriter = new StringWriter();
                xs.Serialize(stringWriter, criterio);
                return XDocument.Parse(stringWriter.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al generar XML: " + ex.Message);
                return null;
            }
        }
        public static async Task<DataSet> EjecutaBase(string nombreProcedimiento, string cadenaConexion, string proceso, string dataXML)
        {
            DataSet dsResultado = new DataSet();

            SqlConnection cnn = new SqlConnection(cadenaConexion);
            try
            {
                SqlCommand cmd = new SqlCommand();
                SqlDataAdapter adt = new SqlDataAdapter();
                cmd.CommandText = nombreProcedimiento;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = cnn;
                cmd.CommandTimeout = 120;
                cmd.Parameters.Add("@iTransaccion", SqlDbType.VarChar).Value = proceso;
                cmd.Parameters.Add("@iXML", SqlDbType.Xml).Value = dataXML.ToString();
                await cnn.OpenAsync().ConfigureAwait(false);
                adt = new SqlDataAdapter(cmd);
                adt.Fill(dsResultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                Console.Write("logs", "EjecutaBase", ex.ToString());
                cnn.Close();
            }
            finally
            {
                if (cnn.State == ConnectionState.Open)
                {
                    cnn.Close();
                }
            }
            return dsResultado;
        }
    }
}
